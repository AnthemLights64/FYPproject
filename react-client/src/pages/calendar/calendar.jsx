import React, {Component} from 'react';
import { Calendar, Badge, Alert, Button, Modal } from 'antd';
import moment from 'moment';
import { formatDate } from '../../utils/dateUtils';
import EventForm from './event-form';

export default class TeamCalendar extends Component {

  state = {
    value: moment(formatDate(Date.now())),
    selectedValue: moment(formatDate(Date.now())),
    isShownEventForm: false
  };

  onSelect = value => {
    this.setState({
      value,
      selectedValue: value
    });
  }
    
  onPanelChange = value => {
    this.setState({
      value
    });
  }

  render () {

    const { value, selectedValue, isShownEventForm } = this.state;

    function getListData(value) {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
            ];
            break;
          case 10:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
              { type: 'error', content: 'This is error event.' },
            ];
            break;
          case 15:
            listData = [
              { type: 'warning', content: 'This is warning event' },
              { type: 'success', content: 'This is very long usual event。。....' },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' },
            ];
            break;
          default:
        }
        return listData || [];
      }
      
      function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className="events">
            {listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))}
          </ul>
        );
      }
      
      function getMonthData(value) {
        if (value.month() === 8) {
          return 1394;
        }
      }
      
      function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      }
      
        
    
    return (
      <>
        <Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}/>
        <Button type='primary' disabled={false} onClick={() => this.setState({isShownEventForm: true})}>Edit Events</Button>
        <Calendar 
          dateCellRender={dateCellRender} 
          monthCellRender={monthCellRender} 
          value={value}
          onSelect={this.onSelect}
          onPanelChange={this.onPanelChange}
        />
        <Modal
          title='Edit Event'
          visible={isShownEventForm}
          //onOk={}
          onCancel={() => {
              this.setState({
                isShownEventForm: false
              });
              this.form.current.resetFields();
          }}
      >
          <EventForm
              setForm={(form) => this.form = form}
          />
      </Modal>  
      </>
    );
  }
}