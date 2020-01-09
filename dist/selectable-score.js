import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import Score from 'meld-clients-core/src/containers/score';
import DragSelect from "dragselect/dist/DragSelect";

const defaultVrvOptions = {
  scale: 45,
  adjustPageHeight: 1,
  pageHeight: 2500,
  pageWidth: 2200,
  noFooter: 1,
  unit: 6
}

const defaultSelectorString = '.note'; 

class SelectableScore extends Component {
  constructor(props) { 
    super(props);
    this.state = { 
      vrvOptions: vrvOptions in this.props 
        ? this.props.vrvOptions 
        : defaultVrvOptions,
      selectorString: selectorString in this.props 
        ? this.props.selectorString
        : defaultSelectors,
      selection: []
    }
    this.enableSelector = this.enableSelector.bind(this);
  }

  enableSelector() {
    if(!Object.keys(this.props.score.SVG).length) {
      return; // no MEI loaded yet
    }
    if (typeof this.state.selector !== "undefined") {
      this.state.selector.stop();
    }
    let selector = new DragSelect({
      selectables: document.querySelectorAll(this.state.selectorString),
      area: document.getElementsByClassName('score')[0],
      selectedClass: 'selected',
      onDragStartBegin: () => {
        document.body.classList.add('s-noselect');
      },
      callback: (elements) => {
        document.body.classList.remove('s-noselect');
        this.handleSelectionChange(elements);
      }
    });
    console.log("About to set selector: ", selector);
    this.setState({selector: selector});
  }
  
  handleSelectionChange(selection) {
    this.setState({selection: selection})
  }

  componentDidMount() { 
    // horrible hack to allow SVG to be loaded into DOM first
    setTimeout(this.enableSelector, 1000)
  }

  componentDidUpdate(prevProps, prevState) { 
    if(prevState.selectors !== this.state.enableSelectors) { 
      // selectors updated
      this.enableSelector()
    }
  }

  render() { 
    return(
      <Score 
        uri={ this.props.uri }
        key={ this.props.uri }
        options={ this.state.vrvOptions }
      />
    )
  }
}

function mapStateToProps({ score }) {
  return { score }
}


export default connect(mapStateToProps,)(SelectableScore);