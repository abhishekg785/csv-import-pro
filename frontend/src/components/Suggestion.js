// @flow

import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Divider,
} from '@material-ui/core'
import Highlighter from 'react-highlight-words'

type suggestion = {
  id: number,
  name: string,
}

type Props = {
  query?: string,
  suggestions: Array<suggestion>,
  selectSuggestion: Function,
  classes: any,
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
  },
});

function Suggestion({
  query,
  suggestions,
  selectSuggestion,
  classes,
}: Props) {
  if (!suggestions) return null

  return (
    <div className={classes.root}>
      <List component="nav">
        {suggestions.map(d => (
          <Fragment key={d.id}>
            <ListItem
              button
              onClick={() => selectSuggestion(d.name)}
            >
              <Highlighter
                highlightClassName="highlight"
                searchWords={[query]}
                autoEscape
                textToHighlight={`${d.name} ( ${d.id} )`}
              />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  )
}

Suggestion.defaultProps = {
  query: '',
}

export default withStyles(styles)(Suggestion)
