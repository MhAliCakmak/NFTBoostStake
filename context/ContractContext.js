import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  TokenAddress, StakeAddress, NFTAddress, NFTAbi, StakeAbi, TokenAbi,
} from '../constants';
