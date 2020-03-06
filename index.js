'use strict';

import api from './api.js';
import form from './form.js';
import store from './store.js';

const bindSearch = function() {
  $('.landing').on('click', '.search-button', event => {
    $('main').removeClass('hidden');
    $('.results-list').empty();
    form.handleSearchGames();
  });
};

const bindRecommend = function() {
    $('.landing').on('click', '.recommend-button', event => {
        $('main').removeClass('hidden');
        $('.results-list').empty();
        form.handleRecommendGames();
    });
};

const bindHelpButton = function() {
  $('.search').on('click', '.help-button', event => {
    form.handleFilterInstructions();
    alert(store.alert);
  });
};

const handleSubmitSearch = function() {
  $('.search').submit(event => {
    event.preventDefault();
    let query = $('.search').find('input').val();
    let filter = $('.search').find('select').val();
    if (filter == "name") {
      api.getGameByName(query)
      .then(res => {
        handleDisplayResults(res)
      })
    }
    else if (filter == "designer") {
      api.getGameByDesigner(query)
      .then(res => {
        handleDisplayResults(res)
      })
    }
    else if (filter == "publisher") {
      api.getGameByPublisher(query)
      .then(res => {
        handleDisplayResults(res)
      })
    }
    else if (filter == "min_players") {
      api.getGameByMinPlayers(query)
      .then(res => {
        handleDisplayResults(res)
      })
    }
    else if (filter == "max_players") {
      api.getGameByMaxPlayers(query)
      .then(res => {
        handleDisplayResults(res)
      })
    }
    else if (filter == "min_playtime") {
      api.getGameByMinPlaytime(query)
      .then(res => {
        handleDisplayResults(res)
      })
    }
    else if (filter == "max_playtime") {
      api.getGameByMaxPlaytime(query)
      .then(res => {
        handleDisplayResults(res)
      })
    }
    else if (filter == "mechanics") {
      api.getGameByMechanic(query)
      .then(res => {
        handleDisplayResults(res)
      })
    }
    else if (filter == "theme") {
      api.getGameByTheme(query)
      .then(res => {
        return res.json();
      })
      .then(data => {
        handleDisplayResults(data.games)
      })
    };
  });
};

const handleDisplayResults = function(response) {
  let formattedResponse = [];
  console.log(response)
  response.forEach(function(game) {
    formattedResponse.push(
      `<li class="game" data-id="${game.id}>
        <p class="game-name">
          <span>Title:</span>
          ${game.name}
        </p>
        <img class="game-image" src="${game.image_url} "alt="cover art for ${game.name}>
        <p class="game-play-info">
          <span>Players:</span> ${game.min_players}-${game.max_players} </br>
          <span>Duration:</span> ${game.min_playtime}-${game.max_playtime} minutes </br>
          <span>Rating:</span> ${game.average_user_rating} </br>
          <span>Description:</span> ${game.description} </br>
          <span>Designer:</span> ${game.designers} </br>
          <span>Publisher:</span> ${game.publishers} </br>
          <span>Game Mechanics:</span> ${game.mechanics.map(obj => obj.name).join(', ')} </br>
        </p>
        <a class="game-link" href=${game.url} target="_blank">Learn more</a>
      </li>`
      )
  });
  $('.results-list').html(formattedResponse);
}

const main = function() {
  bindSearch();
  bindRecommend();
  bindHelpButton();
  handleSubmitSearch();
  api.getMechanics();
  api.getThemes();
};

$(main);