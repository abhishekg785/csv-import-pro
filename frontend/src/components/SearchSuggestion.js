// @flow

import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Highlighter from "react-highlight-words";

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
    width: '40%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SearchSuggestion({ query, suggestions, selectSuggestion, classes }: Props) {
  if (!suggestions) return null

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {suggestions.map(d => (
            <TableRow key={d.id}>
              <TableCell
                onClick={() => selectSuggestion(d.name)}
              >
                <Highlighter
                  highlightClassName="highlight"
                  searchWords={[query]}
                  autoEscape
                  textToHighlight={`${d.name} ( ${d.id} )`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

SearchSuggestion.defaultProps = {
  query: '',
}

export default withStyles(styles)(SearchSuggestion)
