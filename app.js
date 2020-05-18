new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        playerColor: 'green',
        monsterColor: 'green',
        gameIsRunning: false,
        maxHeal: 3,
        maxSpecialAttack: 3,
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.playerColor = 'green',
            this.monsterColor = 'green',
            this.maxHeal = 3,
                this.maxSpecialAttack = 3,
                this.turns = [];
        },
        attack() {
            var damage = this.calcDamage(10, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage + ' units'
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
            
            this.myPlayerColor();
            this.myMonsterColor();
        },
        specialAttack() {
            if (this.maxSpecialAttack > 0) {

                this.maxSpecialAttack -= 1;
                var damage = this.calcDamage(20, 10);
                this.monsterHealth -= damage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player hits Monster hard for ' + damage + ' units'
                });

                if (this.checkWin()) {
                    return;
                }
                this.monsterAttack();
                this.myPlayerColor();
                this.myMonsterColor();

            }
        },
        heal() {
            if (this.maxHeal > 0) {
                this.maxHeal -= 1;
                if (this.playerHealth <= 90) {
                    this.playerHealth += 10;
                } else {
                    this.playerHealth = 100;
                }
                this.monsterAttack();
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'Player healed for 10 units'
            })
            this.myPlayerColor();

        },
        giveUp() {
            this.gameIsRunning = false;
            alert('MONSTER WON!!!\nYou left the game');
        },
        monsterAttack() {
            var damage = this.calcDamage(12, 5)
            this.playerHealth -= damage;

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage + ' units'
            });
            
            this.checkWin();
        },
        calcDamage(MAX, MIN) {
            return Math.max(Math.floor(Math.random() * MAX) + 1, MIN);
        },
        myPlayerColor() {
            if (this.playerHealth >= 70) {
                this.playerColor = 'green'
                return this.playerColor;
            }
            else if (this.playerHealth < 70 && this.playerHealth >=25 ){
                this.playerColor = 'orange'
                return this.playerColor;
            }
            if (this.playerHealth < 25) {
                this.playerColor = 'red'
                return this.playerColor;
            }
        },
        myMonsterColor() {
            if (this.monsterHealth >= 70) {
                this.monsterColor = 'green'
                return this.monsterColor;
            }
            else if (this.monsterHealth < 70 && this.monsterHealth >=25 ){
                this.monsterColor = 'orange'
                return this.monsterColor;
            }
            if (this.monsterHealth < 25) {
                this.monsterColor = 'red'
                return this.monsterColor;
            }

        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if (confirm('You WON! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                if (confirm('You LOST! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
    },
});