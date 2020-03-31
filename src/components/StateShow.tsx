import React from 'react'
import { Animate } from './Animate'

import * as loading from '../../assets/lotties/loading.json'
import * as empty from '../../assets/lotties/empty.json'

interface Props {
  state?: 'LOADING' | 'SUCCESS' | 'EMPTY';
}

export const StateShow = ({ state }: Props) => {
    if (state === 'LOADING') {
      return <Animate animationData={loading.default} />
    }
    if (state === 'EMPTY') {
      return <Animate animationData={empty.default} />
    }
    return null
}
