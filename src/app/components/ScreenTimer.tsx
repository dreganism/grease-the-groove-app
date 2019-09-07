import React from 'react'
import styled from 'styled-components'

import bellSound from './../../assets/sounds/definite.mp3'

import { Button, ButtonWrapper } from './Button'
import { Heading, SpanBig, SpanSmall, Text } from './Typography'
import { Icon, IconWraper } from './Icon'
import Nav from './Nav'
import { ScreenWrapper } from './Wrappers'

// Import electron dialog module
const dialog = require('electron').remote.dialog

export default class ScreenTimer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isTimerRunning: false,
      seconds: this.props.pauseLength * 60, // pauseLength is in minutes
      time: {}
    }

    this.timer = 0
    this.countDown = this.countDown.bind(this)
    this.playSound = this.playSound.bind(this)
    this.restartTimer = this.restartTimer.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60))

    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)

    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)

    let obj = {
      'h': hours,
      'm': minutes,
      's': seconds
    }

    return obj
  }

  componentDidMount() {
    let restPauseLength = this.props.pauseLength * 60 // pauseLength is in minutes

    this.setState({
      time: this.secondsToTime(this.state.seconds)
    })
  }

  startTimer() {
    if (!this.state.isTimerRunning && this.state.seconds !== 0) {
      // If timer is not at 0 and is not running, start countdown
      this.timer = setInterval(this.countDown, 1000)
    } else {
      // If we are on 0, restart timer
      this.restartTimer()

      // Start new countdown
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  stopTimer() {
    clearInterval(this.timer)

    this.setState({
      isTimerRunning: false
    })
  }

  restartTimer() {
    clearInterval(this.timer)

    let newTime = this.secondsToTime(this.props.pauseLength * 60)
    let newSeconds = this.state.seconds - 1

    this.setState({
      isTimerRunning: false,
      seconds: this.props.pauseLength * 60,
      time: newTime
    })
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1

    this.setState({
      isTimerRunning: true,
      seconds: seconds,
      time: this.secondsToTime(seconds)
    })

    // Check if we're at 0.
    if (seconds === 0) {
      this.playSound()

      clearInterval(this.timer)

      this.setState({
        isTimerRunning: false
      })
    }
  }

  playSound() {
    const soundFile = new Audio(bellSound);

    soundFile.volume = 1 // 0.5 is half volume

    soundFile.play()

    // Wait 0.25s so the sound plays first
    setTimeout(() => {
      // Use electron native dialog box (notification box)
      dialog.showMessageBox({type: 'info', buttons: ['OK'], message: 'Time for Grease the Groove!'})
    }, 400)
  }

  render() {
    const props = this.props

    return(
      <ScreenWrapper static>
        {/* <Nav toggleTimer={props.toggleTimer} hasCrossTimer /> */}

        {/* <Heading small>Timer</Heading> */}

        <Text>
          <SpanBig>{this.state.time.h}</SpanBig>
          <SpanSmall>hr</SpanSmall>
          {' : '}
          <SpanBig>{this.state.time.m}</SpanBig>
          <SpanSmall>min</SpanSmall>
          {' : '}
          <SpanBig>{this.state.time.s}</SpanBig>
          <SpanSmall>sec</SpanSmall></Text>

        <ButtonWrapper>
          <Button onClick={this.restartTimer} first><Icon reset /></Button>

          <Button onClick={this.startTimer} middle><Icon play /></Button>

          <Button onClick={this.stopTimer} last><Icon stop /></Button>
        </ButtonWrapper>
      </ScreenWrapper>
    )
  }
}