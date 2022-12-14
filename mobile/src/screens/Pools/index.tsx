import { FlatList, Icon, ScrollView, Toast, useToast, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { useCallback, useState } from "react";
import { Loading } from "../../components/Loading";
import { PoolCard, PoolPros } from "../../components/PoolCard"
import { EmptyPoolList } from '../../components/EmptyPoolList'


export function Pools() {
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState<PoolPros[]>([])
  const { navigate } = useNavigation()

  const toast = useToast()

  async function fetchPools() {
    try {
      setIsLoading(true)
      const reponse = await api.get('/pool');
      setPools(reponse.data.pools)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: "red.500"
      })

    } finally {
      setIsLoading(false)
    }

  }

  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []))

  return (
    <VStack flex={1} bgColor="gray.900" >
      <Header title="Meus bolões" />
      <VStack mt={8} mx={5} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4} >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="balck" size="md" />}
          onPress={() => { navigate('find') }}
        />
      </VStack>
      {isLoading ? <Loading /> :
        <FlatList
          data={pools}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      }

    </VStack>
  )
}