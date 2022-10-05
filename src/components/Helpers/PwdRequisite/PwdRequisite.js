import React from 'react'
import zxcvbn from 'zxcvbn'

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = testResult.score * 100/4;

  const createPassLabel = () => {
    switch(testResult.score) {
      case 0:
        return 'Muy Débil';
      case 1:
        return 'Débil';
      case 2:
        return 'Aceptable';
      case 3:
        return 'Buena';
      case 4:
        return 'Fuerte';
      default:
        return '';
    }
  }

  const funcProgressColor = () => {
    switch(testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  }

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '7px'
  })

  return (
    <>
      <div className="progress" style={{ height: '7px', marginRight: '4rem', marginLeft: '4rem' }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor(), marginRight: '5rem', marginLeft: '5rem' }}>{createPassLabel()}</p>
    </>
  )
}

export default PasswordStrengthMeter
