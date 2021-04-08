import React, {Component} from 'react';
import { Calendar, Badge, Alert, Button, Modal, message } from 'antd';
import moment from 'moment';
import { formatDate } from '../../utils/dateUtils';
import EventForm from './event-form';
import { reqAddEvent, reqEvents } from '../../api';
import memoryUtils from '../../utils/memoryUtils';

export default class TeamCalendar extends Component {

  state = {
    value: moment(formatDate(Date.now())),
    selectedValue: moment(formatDate(Date.now())),
    isShownEventForm: false,
    allEvents: []
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

  addEvent = () => {
    this.form.current.validateFields()
      .then( async values => {
        this.setState({
          isShownEventForm: false
        });
        // console.log(values)
        // console.log(this.state.value)
        // console.log(this.state.selectedValue)
        // console.log(this.state.selectedValue.date())

        // let eventsList = [];
        // for (let i = 0; i < values.events.length; i++) {
        //   eventsList.push({date: this.state.selectedValue.date(), type: 'success', content: values.events[i]});            
        // }
        this.form.current.resetFields();

        const {events} = values;
        const eventsToAdd = {date: this.state.selectedValue, eventList: events};
        const result = await reqAddEvent(eventsToAdd);
        if (result.data.status===0) {
          message.success('Successfully added events!');
          this.getEvents();
        } else {
          message.error('Failed to add events.');
        }
        
      })
      .catch(errorInfo => {  
        console.log(errorInfo);
      });
  }

  getEvents = async () => {
    const result = await reqEvents();
    //console.log(result.data.data[0].date)
    //console.log(moment(formatDate(result.data.data[0].date)).month())

    if (result.data.status===0) {
      const allEvents = result.data.data;
      this.setState({
        allEvents
      });
      //console.log(allEvents)
      //console.log(this.state.allEvents);
    }
    
  }

  isAbleToEditCalendar() {
    //console.log(memoryUtils.user.role.menus.indexOf('/management') > -1)
    if (memoryUtils.user.username === 'admin') return true;
    else if (memoryUtils.user.role.menus.indexOf('/management') > -1) return true;
    else return false;
  }

  UNSAFE_componentWillMount() {
    this.getEvents();
  }

  render () {
    
    const { value, selectedValue, isShownEventForm, allEvents } = this.state;  

    function getListData(value) {
      let listData = [];
      // console.log(value.year())
      // console.log(value.month()+1)
      // console.log(value.date())
      // console.log(allEvents.length)
      // console.log(allEvents[0] ? moment(formatDate(allEvents[0].date)).date() : [])
      allEvents.map(item => {
        if (value.year() === item ? moment(formatDate(item.date)).year() : []) {
          if (value.month() === moment(formatDate(item.date)).month()) {
            if (value.date() === moment(formatDate(item.date)).date()) {
              for (let i = 0; i < item.eventList.length; i++) {
                listData.push({content: item.eventList[i]});
              }
            }
          }
        }
        //console.log(listData)
        return listData || [];
      });
      return listData || [];
    }
      
    function dateCellRender(value) {
      const listData = getListData(value);
      //console.log(listData)
      return (
        <ul className="events">
          {listData.map(item => (
            <li key={item.content}>
              <Badge color="#E06049" text={item.content} />
            </li>
          ))}
        </ul>
      );
    }    
            
    return (
      <>
        <Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}/>
        <Button type='primary' disabled={!this.isAbleToEditCalendar()} onClick={() => this.setState({isShownEventForm: true})}>Edit Events</Button>
        <Calendar 
          dateCellRender={dateCellRender} 
          value={value}
          onSelect={this.onSelect}
          onPanelChange={this.onPanelChange}
        />
        <Modal
          title='Edit Event'
          visible={isShownEventForm}
          onOk={this.addEvent}
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