import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

type Meal = {
  id: number;
  name: string;
  price: number;
  type: string;
};

export default function HomePage({ navigation }: any) { 
  const [meals, setMeals] = useState<Meal[]>([]);

  const calculateAveragePrice = (course: string) => {
    const filteredMeals = meals.filter(meal => meal.type === course);
    const total = filteredMeals.reduce((sum, meal) => sum + meal.price, 0);
    return filteredMeals.length ? (total / filteredMeals.length).toFixed(2) : '0.00';
  };

  return (
    <View style={styles.container}>
      <Text>Average Prices:</Text>
      <Text>Main Course: R{calculateAveragePrice('Main Course')}</Text>
      <Text>Dessert: R{calculateAveragePrice('Dessert')}</Text>
      <Text>Starters: R{calculateAveragePrice('Starters')}</Text>

      <FlatList 
        data={meals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} ({item.type}): R{item.price.toFixed(2)}</Text>
        )}
      />

      <Button title="Go to Main Page" onPress={() => navigation.navigate('MainPage', { meals, setMeals })} />
      <Button title="Go to Filter Page" onPress={() => navigation.navigate('ThirdPage', { meals })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
