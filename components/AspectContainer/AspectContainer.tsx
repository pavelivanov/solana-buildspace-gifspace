import React from 'react'
import cx from 'classnames'

import s from './AspectContainer.module.scss'


type AspectContainerProps = {
  children: React.ReactElement<{ className?: string }>
  className?: string // comes from <Box noWrapper>
  aspect?: number // w / h, e.g. 1.33
  fit?: 'cover' | 'contain'
  'data-testid'?: string
}

// It helps to create placeholders for images
const AspectContainer: React.FunctionComponent<AspectContainerProps> = (props) => {
  const { children, className, aspect = 1, fit = 'cover', 'data-testid': dataTestId } = props

  const placeholderStyle = {
    paddingTop: `${Math.round(100 / aspect)}%`,
  }

  const childClassName = cx(s.child, children.props.className, {
    [s.fitCover]: fit === 'cover',
    [s.fitContain]: fit === 'contain',
  })

  return (
    <div className={cx(s.root, className)} data-testid={dataTestId}>
      <div style={placeholderStyle} />
      {
        React.cloneElement(
          children,
          {
            className: childClassName,
          }
        )
      }
    </div>
  )
}


export default AspectContainer
