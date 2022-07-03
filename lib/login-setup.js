import { useEffect, useState } from 'react';
import { sequence } from '0xsequence';
import { ethers } from 'ethers';

const loginSetup = () => {
  
  let providerOptions

  if( typeof window !== 'undefined' ){
    if(!window?.ethereum?.isSequence){
      providerOptions = {
        package: sequence,
        options: {
          appName: "Tris",
          defaultNetwork: 'polygon'
        }
      }
    }
  }
}
