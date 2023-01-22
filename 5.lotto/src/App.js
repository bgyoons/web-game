import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []) // 함수 결과값을 기억
  const [winNumbers, setWinNumbers] = useState(lottoNumbers)
  const [winBalls, setWinBalls] = useState([])
  const [bonus, setBonus] = useState(null)
  const [redo, setRedo] = useState(false)
  const timeouts = useRef([])

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        console.log('setTimeout');
        setWinBalls((prevState) => ([...prevState, winNumbers[i]]))
      }, (i + 1) * 700);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6])
      setRedo(true)
    }, 5000);

    return () => timeouts.current.forEach((v) => {
      console.log('clearTimeout');
      clearTimeout(v);
    });
  }, [timeouts.current])

  useEffect(() => {
    console.log(winBalls);
  }, [winBalls])

  const onClickRedo = useCallback(() => { // 함수 자체를 기억
    console.log('onClickRedo', winNumbers);
    setWinNumbers(getWinNumbers())
    setWinBalls([])
    setBonus(null)
    setRedo(false)
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  )
}

export default Lotto;
