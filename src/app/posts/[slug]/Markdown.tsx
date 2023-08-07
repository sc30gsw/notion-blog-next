/* eslint-disable react/no-children-prop */
'use client'
import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'

const Markdown = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      children={markdown}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        },
      }}
    ></ReactMarkdown>
  )
}

export default Markdown
