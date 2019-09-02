# JusoheReactNativeExample
react-native-cli 앱으로 안드로이드 폰에 직접, 혹은 에뮬레이터로 같이 올린 웹 소켓 서버와 통신할 수 있습니다.

## 설치법 (ReactNative)
Android Studio 및 Android SDK, npm이 설치되어 있다고 가정합니다.
1. `npm install -g react-native-cli` 실행
2. `git clone https://github.com/NaLDo627/JusoheCheckLanguage.git` 혹은 zip파일 다운로드 후, 설치 디렉토리로 이동
3. `npm install` 실행 후, `react-native run-android` (이때, 안드로이드 에뮬레이터가 켜져있거나, USB 디버깅이 활성화된 안드로이드 폰이 연결되어 있어야 함)

## 예제 서버 구동법 (Python3)
pip가 설치되어 있다고 가정합니다. (Anaconda 등 가상 환경에서 실행하는 것을 권장)
1. websocket_server 폴더로 이동
2. `pip install -r requirements.txt` 실행
3. `python ws_server.py` 혹은 `python ws_server_with_model.py` 실행 (전자는 에코서버, 후자는 영화리뷰 평점 모델이 적용된 서버)

## 사용법 
서버와 모바일이 같은 네트워크에 속해 있어야 합니다.
1. 모바일 화면에서 Address 부분에 서버 주소를 넣습니다. (명령 프롬프트 -> ipconfig -> 현재 어댑터의 IPv4 주소)
2. Connect 버튼을 클릭합니다. Connect버튼이 Disconnect 버튼으로 바뀌면 성공입니다. (출력창에도 connected.. 라고 뜹니다)
3. Input 부분에 텍스트를 입력합니다.
4. Start Record 버튼을 누르고 말한 뒤, Stop Record를 누르면 음성이 텍스트로 변환되어 출력됩니다. 만약 서버에 접속되어 있다면 변환된 텍스트가 서버로 전송됩니다.

## Trouble shooting
- Android 스튜디오와 SDK 설치는 필수입니다! <https://yuddomack.tistory.com/entry/1React-Native-%EC%84%A4%EC%B9%98%EC%99%80-%EC%8B%A4%ED%96%89hello-world>
- Library License Agree 관련 이슈, 에뮬레이터 관련 이슈 : <https://suyou.tistory.com/154>
- 혹시 모바일 화면에서 한글이 깨져 나온다면, ws_server.py 혹은 ws_server_with_model.py 안에 on_message 함수의 주석 해제하시고 서버 재시작하면 됩니다.
- 그 밖에 문의나 오류 발생 시 메일 주시기 바랍니다 : hygoogi@hints.or.kr
