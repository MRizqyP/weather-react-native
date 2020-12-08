import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';

const App = () => {
  const [data, setData] = useState({
    name: 'loading ',
    temp: 'loading',
    humidity: 'loading',
    desc: 'loading',
    icon: 'loading',
  });
  const [daily, setDaily] = useState([]);

  const dailyData = daily.filter((reading) =>
    reading.dt_txt.includes('18:00:00'),
  );

  useEffect(() => {
    const FetchData = async () => {
      const request = await axios.get(
        'http://api.openweathermap.org/data/2.5/weather?q=Bandung&appid=0755804cb83ab934a88cd034d880414b',
      );
      const request1 = await axios.get(
        'http://api.openweathermap.org/data/2.5/forecast?q=Bandung&appid=0755804cb83ab934a88cd034d880414b',
      );
      setDaily(request1.data.list);

      setData({
        name: request.data.name,
        temp: request.data.main.temp,
        humidity: request.data.main.humidity,
        main: request.data.weather[0].main,
        icon: request.data.weather[0].icon,
      });
      return request;
    };

    FetchData();
  }, []);

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          borderLeftWidth: 1,
          borderLeftColor: '#fff',
          margin: 3,
        }}
      />
    );
  };

  const renderItem = ({item}) => (
    <View style={{alignItems: 'center', margin: 3}}>
      <Text style={{color: '#000', fontSize: 20, fontWeight: '800'}}>
        {moment(item.dt_txt).format('dddd').substring(0, 3)}
      </Text>
      <Text>{item.weather[0].main}</Text>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{
          uri:
            'https://openweathermap.org/img/w/' + item.weather[0].icon + '.png',
        }}
      />
      <View style={{flexDirection: 'row'}}>
        <Text>{item.main.temp.toString().substring(0, 2)}</Text>
        <Text>°F</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWeatherTop}>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Text style={{color: '#fff', fontSize: 30, fontWeight: '800'}}>
            {data.name.toUpperCase()}
          </Text>
        </View>
        <Text style={{color: '#dde4f0', fontSize: 12, fontWeight: '800'}}>
          {moment().locale('id').format('LLL')}
        </Text>
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={{
            uri: 'https://openweathermap.org/img/w/' + data.icon + '.png',
          }}
        />
        <Text style={{color: '#dde4f0', fontSize: 14, fontWeight: '800'}}>
          {data.main}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#dde4f0', fontSize: 50, fontWeight: '800'}}>
            {data.temp.toString().substring(0, 2)}
          </Text>
          <Text style={{color: '#dde4f0', fontSize: 20, fontWeight: '800'}}>
            °F
          </Text>
        </View>
      </View>
      <View style={{margin: 20}}>
        <Text
          style={{
            color: '#b4b8bf',
            fontSize: 25,
            fontWeight: '800',
            marginBottom: 20,
          }}>
          Forecast
        </Text>
        <FlatList
          horizontal={true}
          data={dailyData}
          renderItem={renderItem}
          ItemSeparatorComponent={FlatListItemSeparator}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0377fc',
  },
  containerWeatherTop: {
    margin: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default App;
