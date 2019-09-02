# JusoheReactNativeExample
Expo를 사용해 간단하게 모바일(안드로이드)에서 테스트 해볼 수 있으며, 같이 올린 웹 소켓 서버를 통해 통신할 수 있습니다.

## 설치법 (ReactNative)
npm이 설치되어 있다고 가정합니다.
1. `npm install -g expo-cli` 실행
2. `git clone https://github.com/NaLDo627/JusoheReactNativeExample.git` 혹은 zip파일 다운로드 후, 설치 디렉토리로 이동
3. `npm install` 실행 후, `npm start --tunnel`, 뜨는 화면에 QR코드 확인 (Tunnel, LAN, Local 세 가지 중 Tunnel이 선택되어 있는지 확인)
4. 모바일에서 Google Play 스토어 접속 후, Expo 앱 다운로드
5. Expo 앱 실행 후 Scan QR Code 클릭, 3번의 QR코드 스캔 (단, 이때 같은 네트워크에 속해 있어야 함)

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

## Trouble shooting
- Expo 앱으로 접속이 안될 경우, PC Expo UI에서 QR 코드 아래에 Tunnel로 체크되어 있는지 확인해 보세요.
- 혹시 모바일 화면에서 한글이 깨져 나온다면, ws_server.py 혹은 ws_server_with_model.py 안에 on_message 함수의 주석 해제하시고 서버 재시작하면 됩니다.
