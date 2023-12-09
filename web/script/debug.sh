ROOT_DIR=$(git rev-parse --show-toplevel)
WEBVIEW_DIR=$ROOT_DIR/webview
WEB_DIR=$ROOT_DIR/web

WEBVIEW_ANDROID_ASSETS_DIR=$WEBVIEW_DIR/android/app/src/main/assets/

cd $WEB_DIR && yarn build
cp -r $WEB_DIR/dist/* $WEBVIEW_ANDROID_ASSETS_DIR

cd $WEBVIEW_DIR && yarn start
