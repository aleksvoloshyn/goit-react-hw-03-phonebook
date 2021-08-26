import './App.css';
import React from 'react';
import { Container } from './Components/Container/Container';
import { ContactForm } from './Components/ContactForm/ContactForm';
import { Filter } from './Components/Filter/Filter';
import { ContactList } from './Components/ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import s from './../src/Components/Container/Container.module.css';

import 'react-notifications-component/dist/theme.css';
import 'animate.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  onSuccsessNotification = () => {
    store.addNotification({
      title: 'Congratulations!',
      message: 'Контакт успешно добавлен в справочник',
      type: 'success', // 'default', 'success', 'info', 'warning'
      container: 'top-right', // where to position the notifications
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
      touchSlidingExit: {
        swipe: {
          duration: 400,
          timingFunction: 'ease-out',
          delay: 0,
        },
        fade: {
          duration: 400,
          timingFunction: 'ease-out',
          delay: 0,
        },
      },
    });
  };

  onErrorNotification = () => {
    store.addNotification({
      title: 'Ошибочка...!',
      message: 'Такой контакт уже есть',
      type: 'danger', // 'default', 'success', 'info', 'warning'
      container: 'top-right', // where to position the notifications
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
      touchSlidingExit: {
        swipe: {
          duration: 400,
          timingFunction: 'ease-out',
          delay: 0,
        },
        fade: {
          duration: 400,
          timingFunction: 'ease-out',
          delay: 0,
        },
      },
    });
  };

  // Удалить текущий контакт
  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(cont => cont.id !== id),
    });
  };

  // Проверка на повтор
  duplicationCheck = newName => {
    return this.state.contacts.find(contact => {
      return contact.name === newName;
    });
  };

  //Добавить новый контакт
  addContact = contact => {
    console.log(contact);
    if (!this.duplicationCheck(contact.name)) {
      this.setState({
        contacts: [
          {
            id: uuidv4(),
            name: contact.name,
            number: contact.number,
          },
          ...this.state.contacts,
        ],
      });
      this.onSuccsessNotification();
      return;
    } else {
      this.onErrorNotification();
      return;
    }
  };

  // Устанваливить значение filter  в state
  setFilter = event => {
    this.setState({ filter: event.currentTarget.value.trim() });
  };

  // Фильтр
  getFilteredResult = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    return (
      <div className="App">
        <Container>
          <h1 className={s.container__label}>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />

          <h2 className={s.container__contacts}>Contacts</h2>
          <Filter name={this.state.filter} onChange={this.setFilter} />
          <ContactList
            contacts={this.getFilteredResult()}
            deleteContact={this.onDeleteContact}
          />
        </Container>
        <ReactNotifications />
      </div>
    );
  }
}

export default App;
