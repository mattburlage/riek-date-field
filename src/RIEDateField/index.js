import React, { Component } from 'react';
import { RIEInput } from 'riek'
import { DateTime } from 'luxon'

const DEFAULT_HOUR = 12

export default class RIEDateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
        }
        this.swapDate = this.swapDate.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
        this.setDate(this.props['value'], this.props['inputStringFormat'])
    }

    swapDate (newValue, datePiece) {
        // console.log('newValue', newValue)

        newValue = parseInt(newValue['number'])

        switch (datePiece) {
            case 'y':
                return DateTime.local(newValue, this.state.date.month, this.state.date.day, DEFAULT_HOUR)
            case 'm':
                return DateTime.local(this.state.date.year, newValue, this.state.date.day, DEFAULT_HOUR)
            case 'd':
                return DateTime.local(this.state.date.year, this.state.date.month, newValue, DEFAULT_HOUR)
            default:
                return false
        }
    }

    setDate (input, format) {
        let myDate = null
        if (typeof input === 'string') {
            let dateFormat = format ? format : 'MM-dd-yyyy'
            myDate = DateTime.fromFormat(input, dateFormat)
        } else if (Object.prototype.toString.call(input) === '[object Date]') {
            myDate = DateTime.fromJSDate(input)
        } else {
            console.log('Bad input type: ' + typeof input)
        }

        this.setState({
            date: myDate
        })
    }

    updateDate(newValue, datePiece) {
        const newDate = this.swapDate(newValue, datePiece)

        let newDateJs = newDate.toJSDate()

        if (newDate.isValid) {
            this.props.onChange(newDateJs)
            this.setDate(newDateJs, this.props['inputStringFormat'])
        } else {
            const oldDate = this.state.date;

            this.setState({
                date: null
            }, () => {
                this.setState({
                    date: oldDate
                })
            })
        }
    }


    render() {
        if (!this.state.date) return 'loading'

        return (
            <span>
              <RIEInput
                  value={this.state.date.year}
                  change={e => this.updateDate(e,'y')}
                  propName="number"
                  classLoading="loading"
                  className={""}
                  editProps={{maxLength: 4}}
                  classInvalid="invalid"
                  isDisabled={this.props.disabled}
                  shouldRemainWhileInvalid
              />
                -
              <RIEInput
                  value={this.state.date.month}
                  change={e => this.updateDate(e,'m')}
                  propName="number"
                  classLoading="loading"
                  editProps={{maxLength: 2}}
                  className={""}
                  classInvalid="invalid"
                  isDisabled={this.props.disabled}
                  shouldRemainWhileInvalid
              />
                -
              <RIEInput
                  value={this.state.date.day}
                  change={e => this.updateDate(e,'d')}
                  propName="number"
                  editProps={{maxLength: 2}}
                  classLoading="loading"
                  className={""}
                  classInvalid="invalid"
                  isDisabled={this.props.disabled}
                  shouldRemainWhileInvalid
              />
            </span>
        );
    }
}