#!/usr/bin/env bash

if [ -x "frps" ]; then
  echo "frps exists."
else
  mkdir upstream
  wget -O- https://github.com/fatedier/frp/releases/download/v0.29.0/frp_0.29.0_linux_386.tar.gz |
    tar xvzf - -C upstream --strip-components=1
  mv upstream/frps frps
  rm -r upstream
fi

if [ ! -f "frps.log" ]; then
  touch frps.log
fi
