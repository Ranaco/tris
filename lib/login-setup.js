import { useEffect, useState } from 'react';
import { sequence } from '0xsequence';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const loginSetup = () => {
  
  let providerOptions

  if( typeof window !== 'undefined' ){
    if(!window?.ethereum?.isSequence){
      providerOptions = {
        sequence: {
        package: sequence,
          options: {
            appName: "Tris",
            defaultNetwork: 'polygon'
          }
        } 
      }
    }
  }
  const web3Modal = new Web3Modal({
    providerOptions,
    cacheProvider: true,
  })
}
