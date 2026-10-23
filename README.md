# Quiz Math

Quiz round, point, time and score arithmetic. The 38 questions at 8 a round make 5 rounds, the last round holding 6.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The rounds truth** - the questions (1 to 1000) divided by the questions a round (1 to 100), rounded up, with the size of the last round.
- **The points truth** - the questions times the points each (1 to 100), plus the bonus a round (0 to 100) for every round.
- **The score truth** - the correct answers over the total (1 to 100000) as a percent to one decimal place, half rounded up.
- **The time truth** - the questions times the seconds each (1 to 3600), plus a break (0 to 120 minutes) between each pair of rounds, shown in hours, minutes and seconds.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any quiz or players and does not know whether questions are fair or a night will run to time, and it gives no verdict that a score is good or a quiz is balanced. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/quizmath/
Repo: https://github.com/iLanis-agent/quizmath
