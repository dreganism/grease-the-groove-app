import React from 'react'
import styled from 'styled-components'

import { Heading, Text } from './Typography'
import { Icon, IconWraper } from './Icon'

const SettingsScreenWrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #fff;
`

const ScreenSettings = (props) => {
  return(
    <SettingsScreenWrapper>
      <nav style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
        <IconWraper href="#" onClick={props.toggleSettings}>
          <Icon cross />
        </IconWraper>
      </nav>

      <Heading small>Settings</Heading>

      <Text>How many sets do you want to do?</Text>

      <input type="number" value={props.numOfSets} onChange={props.changeSets} />

      <Text>How long should the rest pause be (in minutes)? You can use decimal numbers for seconds, i.e.: 0.2 for 12s.</Text>

      <input type="number" value={props.restPauseLength} onChange={props.changePauseLength} />
    </SettingsScreenWrapper>
  )
}

export default ScreenSettings