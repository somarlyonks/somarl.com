#!/usr/bin/env bash

if [ -x "frpc" ]; then
  echo "frpc exists."
else
  mkdir upstream
  wget -O- https://github.com/fatedier/frp/releases/download/v0.37.1/frp_0.37.1_darwin_arm64.tar.gz |
    tar xvzf - -C upstream --strip-components=1
  mv upstream/frpc frpc
  rm -r upstream
fi

if [ ! -f "frpc.log" ]; then
  touch frpc.log
fi
