import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Meal = {
  id: number;
  name: string;
  price: number;
  type: string;
};

export default function MainPage({ meals, setMeals }: { meals: Meal[]; setMeals: React.Dispatch<React.SetStateAction<Meal[]>> }) {
  const [mealName, setMealName] = useState<string>(''); 
  const [mealPrice, setMealPrice] = useState<string>(''); 
  const [mealType, setMealType] = useState<string>('Main Course');

  const addMeal = () => {
    if (mealName && mealPrice && mealType) {
      const newMeal: Meal = {
        id: meals.length + 1,
        name: mealName,
        price: parseFloat(mealPrice),
        type: mealType,
      };
      setMeals([...meals, newMeal]);
      setMealName('');
      setMealPrice('');
      setMealType('Main Course');
    }
  };

  const removeMeal = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder="Meal Name" 
        value={mealName} 
        onChangeText={setMealName}
        style={styles.input}
      />
      <TextInput 
        placeholder="Meal Price" 
        value={mealPrice} 
        onChangeText={setMealPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker 
        selectedValue={mealType} 
        onValueChange={setMealType}
        style={styles.picker}
      >
        <Picker.Item label="Main Course" value="Main Course" />
        <Picker.Item label="Dessert" value="Dessert" />
        <Picker.Item label="Starters" value="Starters" />
      </Picker>

      <Button title="Add Meal" onPress={addMeal} />

      <FlatList 
        data={meals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text>{item.name} ({item.type}): R{item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeMeal(item.id)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
  picker: { height: 50, width: '100%', marginBottom: 12 },
  mealItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  removeButton: { color: 'red' },
});

