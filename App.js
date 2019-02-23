import React, { Component } from "react";
import { StyleSheet, Text, View, PermissionsAndroid } from "react-native";

import { API_KEY } from "./utils/WeatherAPIKey";
import Weather from "./components/Weather";
import Geolocation from "react-native-geolocation-service";

export default class App extends Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    locationName: "",
    error: null
  };

  componentDidMount() {
    // Call location twice to actually get position
    // Freezes at loading screen when called once
    // navigator.geolocation.getCurrentPosition(() => {}, () => {}, {}); // Blank call
    // The working location call
    Geolocation.getCurrentPosition(
      // Success callback
      position => {
        // console.log(position);
        // this.debugFetchWeather(position.coords.latitude, position.coords.longitude);
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      // Error callback
      e => {
        this.setState({
          error: "Unable to fetch weather!"
        });
        console.log(e);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
    );
  }

  debugFetchWeather(lat, lon) {
    this.setState({
      temperature: 50,
      weatherCondition: "Snow",
      locationName: "Cambridge",
      isLoading: false
    });
  }

  fetchWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          locationName: json.name,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });

    // For debugging conditions
    // this.setState({
    //   temperature: 50,
    //   weatherCondition: "Snow",
    //   isLoading: false
    // });
  }

  render() {
    const { isLoading, weatherCondition, temperature, locationName } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather..</Text>
            <Text style={styles.loadingSubText}>Make sure your GPS location is on!</Text>
          </View>
        ) : (
          <Weather
            weather={weatherCondition}
            temperature={Math.round(temperature)}
            locationName={locationName}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#009688"
  },
  loadingText: {
    fontSize: 30,
    textAlign: "center",
    color: "#fff"
  },
  loadingSubText: {
    fontSize: 15,
    textAlign: "center",
    color: "#fff"
  }
});
