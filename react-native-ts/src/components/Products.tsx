import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const URL = 'https://server.aptech.io/online-shop/products';

export default function Products() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(URL);
        const data = await response.json();
        setProducts(data);
        console.log('Data from server:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <ScrollView>
        {products?.map((item: any, index) => {
          return (
            <View key={index}>
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView> */}

      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
