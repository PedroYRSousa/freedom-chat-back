#/bin/bash

rm -rf ./front
git clone https://github.com/PedroYRSousa/freedom-chat-front.git ./front
cd ./front
yarn install
yarn build
cd ..
rm -rf ./front
