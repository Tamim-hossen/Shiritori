'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
function page() {
  const [usedwords, setUsedWords] = useState([])
  const [lastword, setLastWord] = useState('')
  const [currentWord, setCurrentWord] = useState('')
  const [currentplayer, setCurrentPlayer] = useState('player1')
  const [player1score, setPlayer1score] = useState(0)
  const [player2score, setPlayer2score] = useState(0)
  const [timer, setTimer] = useState(60)
  const [lastLetter, setLastLetter] = useState('')

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimer((prev) => prev - 1)
      if (timer === 0) {
        setTimer(60)
        if (currentplayer === 'player1') {
          if (player1score !== 0) {
            setPlayer1score((prev) => prev - 1)
          }

          setCurrentPlayer('player2')
        }
        else {
          if (player2score !== 0) {
            setPlayer2score((prev) => prev - 1)
          }
          setCurrentPlayer('player1')

        }
      }
    }, 1000)

    return () => clearInterval(intervalID);
  }, [timer])


  const lastwordcheck = (lastword, currentword) => {
    const lastsplit = lastword.split("").reverse()
    const currentsplit = currentWord.split("")
    const lastletter = lastsplit[0].toLowerCase()
    const firstletter = currentsplit[0].toLowerCase()

    if (lastletter === firstletter) {
      return true
    }
    else {
      return false
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentWord.length > 3) {

      if (usedwords.includes(`${currentWord}`)) {
        toast.error('Word Already used')
      }

      else {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
        const isaword = await fetch(url)
        if (isaword.ok) {
          if (usedwords.length == 0) {
            setUsedWords([...usedwords, currentWord])
            const splitword = currentWord.split("").reverse()
            setLastWord(currentWord)
            setCurrentWord('')
            setLastLetter(splitword[0])
            setTimer(60)

            if (currentplayer === 'player1') {
              setPlayer1score((prev) => prev + (1 * timer / 10))
              setCurrentPlayer('player2')
            }
            else {
              setCurrentPlayer('player1')
              setPlayer2score((prev) => prev + (1 * timer / 10))
            }
          }
          else {
            const lettercheck = lastwordcheck(lastword, currentWord)


            if (lettercheck) {
              setUsedWords([currentWord, ...usedwords])
              setLastWord(currentWord)
              const splitword = currentWord.split("").reverse()
              setCurrentWord('')
              setLastLetter(splitword[0])
              setTimer(60)
              if (currentplayer === 'player1') {
                setPlayer1score((prev) => prev + (1 * timer / 10))
                setCurrentPlayer('player2')
              }
              else {
                setCurrentPlayer('player1')
                setPlayer2score((prev) => prev + (1 * timer / 10))
              }
            }
            else {
              toast.error('First letter does not match the previous words last letter')
            }
          }
        }
        else {
          toast.error('Wrong Word')
          if (currentplayer === 'player1') {
            setPlayer1score((prev) => prev - 1)
            setCurrentPlayer('player2')
            setCurrentWord('')
          }
          else {
            setPlayer2score((prev) => prev - 1)
            setCurrentPlayer('player1')
            setCurrentWord('')
          }
        }
      }
    }
    else {
      toast.error('Minimum 4 letters')
    }
  }

  return (
    <div className='p-10 flex flex-col gap-10 justify-center itms-center w-full'>
      <label className='text-4xl text-center'>Turn : {currentplayer == 'player1' ? 'player 1' : "player 2"}</label>
      <label className='text-center text-2xl'>Timer : {timer}</label>
      <label className='text-center text-2xl'>Next Word Starts with : {usedwords.length == 0 ? 'Any' : lastLetter}</label>
      <div className='flex flex-row gap-20 items-center justify-center'>
        <div className={`flex flex-col gap-5 justify-center items-center  p-10 rounded-md ${currentplayer === 'player1' ? 'bg-amber-100' : 'bg-transparent'} transition-bg duration-100`}>
          <p className='text-xl'>Player 1</p>
          <form onSubmit={currentplayer === 'player1' ? handleSubmit : (e) => { e.preventDefault(); toast.error(`Player 2's Turn`) }} className='flex flex-row gap-2'>

            <div className='flex flex-row gap-5 justify-center items-center'>
              <label>Enter Your Text</label>
              <input type='text' value={currentplayer === 'player1' ? currentWord : lastword} onChange={(e) => { currentplayer === 'player1' ? setCurrentWord(e.target.value.toLowerCase()) : '' }} className={`border-1 border-black p-2 ${currentplayer === 'player1' ? 'focus:ring-2 h-10 ' : 'disabled h-5'} transition-all`} />
            </div>
            <button type='submit' className={`  ${currentplayer === 'player1' ? 'px-5 py-2 bg-amber-300 hover:bg-amber-400 cursor-pointer' : 'cursor-not-allowed py-1 px-2 bg-red-100'}`}> submit</button>

          </form>
        </div>
        <div className={`flex flex-col gap-5 justify-center items-center  p-10 rounded-md ${currentplayer === 'player2' ? 'bg-amber-100' : 'bg-transparent'} transition-bg duration-100`}>
          <p className='text-xl'>Player 2</p>
          <form onSubmit={currentplayer === 'player2' ? handleSubmit : (e) => { e.preventDefault(); toast.error(`Player 1's Turn`) }} className='flex flex-row gap-2 justify-center items-center'>

            <div className='flex flex-row gap-5 justify-center items-center' >
              <label>Enter Your Text</label>
              <input type='text' value={currentplayer === 'player2' ? currentWord : lastword} onChange={(e) => { currentplayer === 'player2' ? setCurrentWord(e.target.value.toLowerCase()) : '' }} className={`border-1 border-black p-2  ${currentplayer === 'player2' ? 'focus h-10' : 'disabled h-5 cursor-not-allowed'} transition-all`} />
            </div>
            <button type='submit' className={`  ${currentplayer === 'player2' ? 'px-5 py-2 bg-amber-300 hover:bg-amber-400 cursor-pointer' : 'cursor-not-allowed py-1 px-2 bg-red-100'}`}> submit</button>

          </form>
        </div>
      </div>
      <div className='w-full flex flex-col justify-center'>
        <p className='text-center'>Player 1 score : {player1score}</p>
        <p className='text-center'>Player 2 score : {player2score}</p>
      </div>


      <div className='pt-20'>
        <p className='text-center text-2xl pb-5'>Used Words</p>
        {
          usedwords.map((word, index) => {
            return (
              <div key={index} className='flex flex-row gap-2 border-b-1 pb-1 border-gray-400'>
                <p>{index + 1}.</p>
                <p className=''>{word}</p>
              </div>

            )

          })
        }
      </div>
    </div>
  )
}

export default page