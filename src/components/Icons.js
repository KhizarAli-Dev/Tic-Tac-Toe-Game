import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Icons = ({name}) => {
  switch (name) {
    case 'circle':
      return <Icon name="circle-thin" size={38} color={'green'} />;
    case 'cross':
      return <Icon name="times" size={38} color={'red'} />;
    default:
      return <Icon name="pencil" size={38} color={'black'} />;
  }
};

export default Icons;
