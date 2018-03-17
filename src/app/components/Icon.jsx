import styled, { css } from 'styled-components'

export const IconWraper = styled.a`
  color: hsl(0, 0%, 50%);
  transition: color .25s ease-in-out;

  &:hover {
    color: #00a8ff
  }
`

export const Icon = styled.span`
  position: relative;
  vertical-align: middle;
  display: inline-block;
  font-style: normal;
  text-align: left;
  text-indent: -9999px;
  color: inherit;
  direction: ltr;

  &::before,
  &::after {
    content: '';
    pointer-events: none;
  }

  &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }

  ${props => props.menu && css`
    margin: 16px 7px;
    width: 18px;
    height: 2px;
    box-shadow: inset 0 0 0 32px, 0 -6px, 0 6px;
  `}

  ${props => props.cross && css`
    margin: 2px;
    width: 30px;
    height: 30px;
    transform: rotate(45deg);

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      box-shadow: inset 0 0 0 32px;
      transform: translate(-50%, -50%);
    }

    &::before {
      width: 20px;
      height: 2px;
    }

    &::after {
      height: 20px;
      width: 2px;
    }
  `}

  ${props => props.clock && css`
    margin: 2px;
    width: 14px;
    height: 14px;
    border: 2px solid;
    border-radius: 50%;

    &::before,
    &::after {
      position: absolute;
      box-shadow: inset 0 0 0 32px;
    }

    &::before {
      top: 50%;
      width: 5px;
      height: 2px;
      transform: translate(-88%, 0%);
    }

    &::after {
      left: 50%;
      width: 2px;
      height: 5px;
      transform: translate(-50%, 35%);
    }
  `}

  ${props => props.play && css`
    margin: 0;
    width: 0;
    height: 0;
    border-width: 6px 0 6px 12px;
    border-style: solid;
    border-top-color: transparent;
    border-bottom-color: transparent;
  `}

  ${props => props.reset && css`
    width: 9px;
    height: 9px;
    border-width: 2px;
    border-style: solid;
    border-left-color: transparent;
    border-radius: 50%;

    &::before {
      position: absolute;
      width: 0;
      height: 0;
      top: -2px;
      bottom: 0;
      left: -9px;
      border-width: 6px;
      border-style: solid;
      border-right-color: transparent;
      border-left-color: transparent;
      border-bottom-color: transparent;
      transform: rotate(135deg);
    }
  `}

  ${props => props.stop && css`
    margin: 0;
    width: 0;
    height: 0;
    border: 6px solid;
  `}
`
