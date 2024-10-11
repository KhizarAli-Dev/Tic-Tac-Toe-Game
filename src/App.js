import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

export default function App() {
  const [isCross, setIsCross] = useState(false);
  const [gameWinner, setGameWinner] = useState('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = (newGameState) => {
    //  checking  winner of the game
    if (
      newGameState[0] === newGameState[1] &&
      newGameState[0] === newGameState[2] &&
      newGameState[0] !== 'empty'
    ) {
      setGameWinner(`${newGameState[0]} won the game! 🥳`);
    } else if (
      newGameState[3] !== 'empty' &&
      newGameState[3] === newGameState[4] &&
      newGameState[4] === newGameState[5]
    ) {
      setGameWinner(`${newGameState[3]} won the game! 🥳`);
    } else if (
      newGameState[6] !== 'empty' &&
      newGameState[6] === newGameState[7] &&
      newGameState[7] === newGameState[8]
    ) {
      setGameWinner(`${newGameState[6]} won the game! 🥳`);
    } else if (
      newGameState[0] !== 'empty' &&
      newGameState[0] === newGameState[3] &&
      newGameState[3] === newGameState[6]
    ) {
      setGameWinner(`${newGameState[0]} won the game! 🥳`);
    } else if (
      newGameState[1] !== 'empty' &&
      newGameState[1] === newGameState[4] &&
      newGameState[4] === newGameState[7]
    ) {
      setGameWinner(`${newGameState[1]} won the game! 🥳`);
    } else if (
      newGameState[2] !== 'empty' &&
      newGameState[2] === newGameState[5] &&
      newGameState[5] === newGameState[8]
    ) {
      setGameWinner(`${newGameState[2]} won the game! 🥳`);
    } else if (
      newGameState[0] !== 'empty' &&
      newGameState[0] === newGameState[4] &&
      newGameState[4] === newGameState[8]
    ) {
      setGameWinner(`${newGameState[0]} won the game! 🥳`);
    } else if (
      newGameState[2] !== 'empty' &&
      newGameState[2] === newGameState[4] &&
      newGameState[4] === newGameState[6]
    ) {
      setGameWinner(`${newGameState[2]} won the game! 🥳`);
    } else if (!newGameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  };

  const onChangeItem = (itemNumber) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }
    if (gameState[itemNumber] === 'empty') {
      const newGameState = [...gameState]; // Copy the current state
      newGameState[itemNumber] = isCross ? 'cross' : 'circle'; // Update the new state
      setGameState(newGameState); // Set the updated state
      setIsCross(!isCross);
      checkIsWinner(newGameState); // Check for the winner after state update
    } else {
      return Snackbar.show({
        text: 'Position Already is Filled',
        backgroundColor: '#fd1d1d',
        textColor: 'white',
      });
    }
  };

  return (
    <>
      <SafeAreaView>
        <StatusBar />

        {gameWinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{gameWinner}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.playerInfo,
              isCross ? styles.playerX : styles.playerO,
            ]}>
            <Text style={styles.gameTurnTxt}>
              Player {isCross ? 'X' : 'O'}'s Turn
            </Text>
          </View>
        )}
        <FlatList
          numColumns={3}
          data={gameState}
          style={styles.grid}
          renderItem={({item, index}) => (
            <Pressable
              key={index}
              style={styles.card}
              onPress={() => onChangeItem(index)}>
              <Icons name={item} />
            </Pressable>
          )}
        />
        <Pressable style={styles.gameBtn} onPress={reloadGame}>
          <Text style={styles.gameBtnText}>
            {gameWinner ? 'Start New Game' : 'Reload the Game'}
          </Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    backgroundColor: '#f0f0f0',
    elevation: 5, // For shadow on Android
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gameTurnTxt: {
    fontSize: 22,
    color: '#2E3A59',
    fontWeight: '700',
  },
  playerX: {
    backgroundColor: '#4caf50', // Lighter green
  },
  playerO: {
    backgroundColor: '#ffeb3b', // Softer yellow
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10, // Rounded edges for modern look
    backgroundColor: '#fff',
    elevation: 2, // Shadow for grid items
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#999',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    transition: 'transform 0.3s', // Smooth card click animation
  },
  winnerInfo: {
    borderRadius: 10,
    backgroundColor: '#4caf50',
    shadowOpacity: 0.1,
    padding: 10,
  },
  winnerTxt: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 36,
    backgroundColor: '#673AB7',
    elevation: 4,
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});



