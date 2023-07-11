#include <FastLED.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

#define COLOR_ORDER GRB
#define CHIPSET WS2811
#define NUM_LEDS 256
#define BRIGHTNESS 25
#define LED_PIN 12
#define arraySize 16


CRGB leds[NUM_LEDS];
CHSV paleBlue(160, 128, 255);

unsigned long int timing = 0;
int applePosition[2] = {0};
unsigned long int toxicTiming = 0;
int apple_const = -1;
int pos = 0;
int y = 0;
int x = 0;
int a[arraySize][arraySize] = { 0 };

byte direction = 0;  // 0 right    1 up
int snake_size = 4;

const char* ssid = "snakeESP8266";
const char* password =  "qwerty123";

IPAddress local_ip(192,168,1,1);
IPAddress gateway(192,168,1,1);
IPAddress subnet(255,255,255,0);

ESP8266WebServer server(80);

void decreaseCells() {
  for (int i = 0; i < arraySize; i++) {
    for (int j = 0; j < arraySize; j++) {
      if (a[i][j] > 0) {
        a[i][j] -= 1;
      }
    }
  }
}

void twoDimensionalPosition(int n){
  int array[2] = { 0 };
  array[0] = floor(n / 16);
  if (array[0] % 2 == 1){
    array[1] = 16 * (array[0] + 1) -  n - 1;
  }else{
    array[1] = n - 16 * (array[0]);
  }
  for (int i = 0; i<2; i++){
        Serial.println(array[i]);
  }
  Serial.println();
  for (int i = 0; i < 2; i++){
    applePosition[i] = array[i];
  }
}

void rainbowColor(int n){
  leds[n] = CHSV(random(255), 255, 255);
}

void spawnApple() {  // назвать spawnApples
  bool fl = true;
  while (fl) {
    int place = random(256);
    if (leds[place] == 0) {
      leds[place] = CRGB::Green;
      fl = false;
      twoDimensionalPosition(place);
      a[applePosition[0]][applePosition[1]] = apple_const;
    }
  }
}
void resetDisplay(){
  for (int i = 0; i < arraySize; i++) {
    for (int j = 0; j < arraySize; j++) {
        a[i][j] = 0;
    }
  }
  snake_size = 4;
  x = 0;
  y = 0;
}
void spawnHead() {
  if (direction == 1) {
    x = (x + 1) % arraySize;
  } else if (direction == 0) {
    y = (y + 1) % arraySize;
  } else if (direction == 3){
    y = (y - 1) % arraySize;
    if (y < 0){
      y = 15;
    }
  } else{
    x = (x - 1) % arraySize;
    if (x < 0){
      x = 15;
    }
  }
  if (a[x][y] == -1){
    increaseSize();
    spawnApple();
  }else if (a[x][y] > 0){
    resetDisplay();
    delay(100);
    initSnake();
  }else if (a[x][y] == -2){
    decreaseCells();
    snake_size -= 1;
  }
  a[x][y] = snake_size;
}

void moveSnake() {
  decreaseCells();
  spawnHead();
}

void initSnake() {
  for (int i = 0; i < snake_size; ++i) {
    a[0][i] = i + 1;
  }
  x = 0;
  y = snake_size - 1;
  direction = 1;
  spawnApple();
}

void increaseSize(){
  for (int i = 0; i < arraySize; i++) {
    for (int j = 0; j < arraySize; j++) {
      if (a[i][j] > 0) {
        a[i][j] += 1;
      }
    }
  }
  snake_size += 1;
}

void setup() {
  Serial.begin(115200);
  initSnake();
  FastLED.setBrightness(BRIGHTNESS);
  FastLED.addLeds<CHIPSET, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
  //Upping WiFi server
  WiFi.softAP(ssid, password);
  WiFi.softAPConfig(local_ip, gateway, subnet);
  delay(100);
  
  server.on("/ledUpon", handle_ledUpon);

  server.on("/ledDownon", handle_ledDownon);

  server.on("/ledRighton", handle_ledRighton);

  server.on("/ledLefton", handle_ledLefton);
  
  server.begin();
}

int cordsTransformation(int x, int y){
  return (x * arraySize) + (x % 2 ? arraySize - y - 1 : y);
}


void display() {
  for (int i = 0; i < arraySize; i++) {
    for (int j = 0; j < arraySize; j++) {
      int val = a[i][j];

      int n = cordsTransformation(i, j);
      if (a[i][j] > 0 && a[i][j] != apple_const && a[i][j] != -2){
        pos = i * j;
        int y1 = pos / 16;
        rainbowColor(n);
            // Serial.println(j);
      }else if(leds[n] != CRGB::Green && a[i][j] != -2){
        leds[n] = 0;
      }
    }
  }
}

void spawnToxicApple(){
  bool fl = true;
  while (fl) {
    int place = random(256);
    if (leds[place] == 0) {
      leds[place] = CHSV(128, 255, 255);
      fl = false;
      twoDimensionalPosition(place);
      a[applePosition[0]][applePosition[1]] = -2;
    }
  }
}

void printArray () {
    for (int i = 0; i < arraySize; i++) {
      for (int j = 0; j < arraySize; j++) {
          Serial.print(a[i][j]);
          Serial.print(',');
      }
      Serial.println();
    }
    Serial.println();
}

void loop() {
  server.handleClient();
  if (millis() - timing >= 100){
    printArray();

    timing = millis();
    moveSnake();
    if (millis() - toxicTiming >= 30000){
      spawnToxicApple();d
      toxicTiming = millis();
    }
    display();
    FastLED.show();
  }
}
void handle_ledUpon() 
{
  if (direction != 2){
    direction = 1;
    server.send(200, "text/html", "ok");
  }
}

void handle_ledDownon() 
{
  if (direction != 1){
    direction = 2;
    server.send(200, "text/html", "ok");
  }
}

void handle_ledRighton() 
{
  if (direction != 3){
    direction = 0;
    server.send(200, "text/html", "ok");
  }
}

void handle_ledLefton() 
{
  if (direction != 0){
    direction = 3;
    server.send(200, "text/html", "ok");
  }
}


