{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    buildInputs = with pkgs.buildPackages; [
      git
      nodejs_22
      pnpm
      bash
    ];
    # The shellHook below includes a workaround for
    # https://discourse.nixos.org/t/add-bin-bash-to-avoid-unnecessary-pain/
    shellHook = ''
      pnpm install
      pnpm download-helper-binaries
      
      binbash=/bin/bash
      currentbin=/run/current-system/sw/bin/bash

      if [ ! -f $binbash ]; then
        echo "WARNING: /bin/bash not found, but this is needed for Husky scripts. Please make sure to symlink it to a bash binary!"
        if [ -f $currentbin ]; then
          echo "Found bash binary at $currentbin"
          read -p "Symlink '$binbash' to '$currentbin'? [y/N] " yn
          if [[ "$yn" == [Yy]* ]]; then
             sudo ln -s /run/current-system/sw/bin/bash /bin/bash
          fi
        fi
      fi
    '';
}
