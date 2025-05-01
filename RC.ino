int inA1=4;
int inA2=5;
int enA=3;
int inB1=6;
int inB2=7;
int enB=9;
#include <SoftwareSerial.h>
SoftwareSerial bluetooth(10, 11); // RX, TX
char ch;
void setup() {
  Serial.begin(9600);
  bluetooth.begin(9600);
  pinMode(inA1,OUTPUT);
  pinMode(inA2,OUTPUT);
  pinMode(inB1,OUTPUT);
  pinMode(inB2,OUTPUT);
}
void front(){
  analogWrite(enA,255);
  analogWrite(enB,255);
   digitalWrite(inA1,HIGH);
  digitalWrite(inA2,LOW);
  digitalWrite(inB1,HIGH);
  digitalWrite(inB2,LOW);
}
void back()
{
  analogWrite(enA,255);
  analogWrite(enB,255);
  digitalWrite(inA2,HIGH);
  digitalWrite(inA1,LOW);
  digitalWrite(inB2,HIGH);
  digitalWrite(inB1,LOW); 
}
void turn1()
{
  analogWrite(enA,255);
  analogWrite(enB,255);
  digitalWrite(inA2,HIGH);
  digitalWrite(inA1,LOW);
  digitalWrite(inB2,LOW);
  digitalWrite(inB1,HIGH);
}
void turn2(){
  analogWrite(enA,255);
  analogWrite(enB,255);
  digitalWrite(inA2,LOW);
  digitalWrite(inA1,HIGH);
  digitalWrite(inB2,HIGH);
  digitalWrite(inB1,LOW);
}
void stopp(){
  digitalWrite(inA1,LOW);
  digitalWrite(inA2,LOW);
  digitalWrite(inB1,LOW);
  digitalWrite(inB2,LOW);
}
void loop() {
  if (bluetooth.available()){
    ch=bluetooth.read();
    Serial.write(ch);
    switch(ch)
    {
      case 'F':
      front();
      break;
      case 'R':
      turn1();
      break;
      case 'L':
      turn2();
      break;
      case 'B':
      back();
      break;
      case 'S':
      stopp();
      break;
    }
  }
}
