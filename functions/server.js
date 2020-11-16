const admin = require('firebase-admin');
const serviceAccount = require('./permissions.json');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors({ origin: true }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gamblr-8e548.firebaseio.com'
});
const db = admin.firestore();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.nfl.com/scores/', {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForSelector(
    '.css-view-1dbjc4n.r-flex-lgvlli.r-flexBasis-1x7pbhs'
  );
  const teams = await page.evaluate(() => {
    const nflTeams = document.querySelectorAll(
      '.css-view-1dbjc4n.r-flex-lgvlli.r-flexBasis-1x7pbhs'
    );
    const teamsList = [...nflTeams];
    return teamsList.map(team => team.innerText);
  });
  teams.map(async team => {
    console.log('team: ', team);
    const templateLiteral = eval('`' + team + '`');
    console.log({ templateLiteral });

    let awayTeam = null;
    let awayTeamRecord = null;
    let awayTeamScore = null;
    let homeTeam = null;
    let homeTeamRecord = null;
    let homeTeamScore = null;
    let gameStatus = null;
    let timeLeft = null;
    let startTime = null;
    let hours = null;
    let minutes = null;
    let period = null;

    if (team.split('\n')[6] === 'FINAL') {
      awayTeam = team.split('\n')[0];
      awayTeamRecord = team.split('\n')[1];
      awayTeamScore = team.split('\n')[2];
      homeTeam = team.split('\n')[3];
      homeTeamRecord = team.split('\n')[4];
      homeTeamScore = team.split('\n')[5];
      gameStatus = team.split('\n')[6];
    } else if (team.split('\n')[6] === 'GMT') {
      awayTeam = team.split('\n')[1];
      awayTeamRecord = team.split('\n')[2];
      homeTeam = team.split('\n')[3];
      homeTeamRecord = team.split('\n')[4];
      hours = parseInt(team.split('\n')[5].split(' ')[0].split(':')[0]) + 7;
      minutes = team.split('\n')[5].split(' ')[0].split(':')[1];
      period = team.split('\n')[5].split(' ')[1];
    } else {
      awayTeam = team.split('\n')[0];
      awayTeamScore = team.split('\n')[1];
      homeTeam = team.split('\n')[2];
      homeTeamScore = team.split('\n')[3];
      timeLeft = team.split('\n')[4];
      gameStatus = team.split('\n')[5];
    }

    console.log({ awayTeamScore });

    try {
      await db
        .collection('weeks')
        // .doc('/' + req.body.id + '/')
        // .doc()
        .doc('aOjPbtGATSiWtecsdfO6')
        .collection('week10')
        .doc('nWwaRhiqUDzZtOYrVybN')
        .collection('games')
        .doc()
        .create({
          gameDetails: {
            awayTeam,
            awayTeamRecord,
            awayTeamScore,
            homeTeam,
            homeTeamRecord,
            homeTeamScore,
            gameStatus,
            timeLeft,
            startTime,
            hours,
            minutes,
            period
          }
        });
      // return res.status(200).send(team);
    } catch (error) {
      console.log(error);
      // return res.status(500).send(error);
    }
  });
  await browser.close();
})();

// read all
app.get('/api/read', (req, res) => {
  (async () => {
    try {
      // /weeks/aOjPbtGATSiWtecsdfO6/week10/nWwaRhiqUDzZtOYrVybN/games/MNaYSerlSphWzfjdVahA
      let query = db
        .collection('weeks')
        .doc('aOjPbtGATSiWtecsdfO6')
        .collection('week10')
        .doc('nWwaRhiqUDzZtOYrVybN')
        .collection('games');
      let response = [];
      await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            ...doc.data(),
            createTime: doc.createTime,
            readTime: doc.readTime,
            updateTime: doc.updateTime
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get('/api/test', (req, res) => {
  (async () => {
    try {
      // /weeks/aOjPbtGATSiWtecsdfO6/week10/nWwaRhiqUDzZtOYrVybN/games/MNaYSerlSphWzfjdVahA
      let query = db.collection('weeks');

      let response = [];
      await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            ...doc.data()
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// create item
app.post('/api/create', (req, res) => {
  (async () => {
    try {
      await db
        .collection('items')
        // .doc('/' + req.body.id + '/')
        .doc()
        .create({ item: req.body.item });
      return res.status(200).send(req.body);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// read item
app.get('/api/read/:item_id', (req, res) => {
  (async () => {
    try {
      const document = db.collection('items').doc(req.params.item_id);
      let item = await document.get();
      let response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get('/api/read/items', (req, res) => {
  (async () => {
    try {
      let query = db.collection('items');
      let response = [];
      await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            item: doc.data().item
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// update
app.put('/api/update/:item_id', (req, res) => {
  (async () => {
    try {
      const document = db.collection('items').doc(req.params.item_id);
      await document.update({
        item: req.body.item
      });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// delete
// /weeks/aOjPbtGATSiWtecsdfO6/week10/nWwaRhiqUDzZtOYrVybN/games
app.delete('/api/delete/:item_id', (req, res) => {
  (async () => {
    console.log({ ...req.params });
    try {
      const document = db
        .collection('weeks')
        .doc('aOjPbtGATSiWtecsdfO6')
        .collection('week10')
        .doc('nWwaRhiqUDzZtOYrVybN')
        .collection('games')
        .doc(req.params.item_id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
