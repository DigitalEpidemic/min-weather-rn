import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import { weatherConditions } from "../utils/WeatherConditions";

const weather = ({ weather, temperature, locationName }) => {
  return (
    <View style={[styles.weatherContainer, { backgroundColor: weatherConditions[weather].color }]}>
      <View style={styles.headerContainer}>
        <Icons size={74} name={weatherConditions[weather].icon} color={"#fff"} />
        <View style={styles.infoContainer}>
          <Text style={styles.tempText}>{temperature}˚</Text>
          <Text style={styles.subtitle}>{locationName}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>{weatherConditions[weather].subtitle}</Text>
      </View>
    </View>
  );
};

weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
  locationName: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  infoContainer: {
    flexDirection: "column"
  },
  tempText: {
    fontSize: 72,
    color: "#fff"
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: "#fff"
  },
  subtitle: {
    fontSize: 20,
    color: "#fff"
  }
});

export default weather;
