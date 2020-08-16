import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import theme from "prism-react-renderer/themes/github"
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import {mdx} from '@mdx-js/react'

theme.plain.backgroundColor = 'none'

const CodeBlock = ({children, className, live, render}) => {
  const language = className.replace(/language-/, '')

  if (live) {
    return (
      <div style={{marginTop: '40px', backgroundColor: 'black'}}>
        <LiveProvider
          code={children.trim()}
          transformCode={code => '/** @jsx mdx */' + code}
          scope={{mdx}}
        >
          <LivePreview />
          <LiveEditor />
          <LiveError />
        </LiveProvider>
      </div>
    )
  }

  if (render) {
    return (
      <div style={{marginTop: '40px'}}>
        <LiveProvider code={children}>
          <LivePreview />
        </LiveProvider>
      </div>
    )
  }

  return (
    <Highlight {...defaultProps} theme={theme} code={children.trim()} language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px', overflowX: 'scroll'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default {
  code: CodeBlock
}
