import React from "react";
import { View, Text } from "react-native";
import AnimatedBar from "./AnimatedBar";

const DataRow = ({ animateStatBars, label, value, index }) => {
  return (
    <View style={styles.statusRow}>
      <View style={styles.statusLabel}>
        <Text style={styles.statusLabelText}>{label}</Text>
      </View>
      <View style={styles.statusValue}>
        <Text style={styles.statusValueText}>{value}</Text>
      </View>
      <View style={styles.statusBar}>
        <AnimatedBar animate={animateStatBars} value={value} index={index} />
      </View>
    </View>
  );
};

const styles = {
  statusRow: {
    flex: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 40,
  },
  statusLabel: {
    flex: 3,
    alignSelf: "flex-start"
  },
  statusLabelText: {
    fontWeight: "bold",
    color: "#6e6e6e"
  },
  statusValue: {
    flex: 2
  },
  statusValueText: {
    color: "#404040"
  },
  statusBar: {
    flex: 5
  }
};

export default DataRow;
