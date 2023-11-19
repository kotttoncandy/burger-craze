import kaboom from 'kaboom';

var w = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var h = (window.innerHeight > 0) ? window.innerHeight : screen.height;

var sc = h / 615

kaboom({
    maxFPS: 240,
    crisp: true,
    width: (1128 * 1.25),
    height: 615 * 1.25,
    scale: 0.8 * sc,
    stretch: false,
    debug: true
});

/*
        A fast-paced game where players need to build burgers for customers. The ingredients fall down from the top of the screen and players need to drag and drop them onto the burger. 


Music track: Onion by Lukrembo
Source: https://freetouse.com/music
Royalty Free Music for Video (Safe)
*/

loadSprite('bottomBun', 'images/bottomBun2.png')
loadSprite('lettuce', 'images/lettuce2.png')
loadSprite('tomato', 'images/tomato2.png')
loadSprite('patty', 'images/patty.png')
loadSprite('topBun', 'images/topBun.png')
loadSprite('background', 'images/pattern.png')
loadSprite('bell', 'images/bell.png')
loadSprite('paper', 'images/paper.png')
loadSprite('table', 'images/table.png')
loadSprite('guacamole', 'images/guacamole.png')
loadSprite('title', 'images/title.png')
loadSprite('titleBackground', 'images/titleBackground.png')
loadSprite('play', 'images/play.png')
loadSprite('tutorial', 'images/tutorial.png')
loadSprite('click', 'images/click.png')
loadSprite('clickHere', 'images/clickHere.png')
loadSprite('pause', 'images/pause.png')
loadSprite('playButton', 'images/playButton.png')
loadSprite('pickles', 'images/pickles.png')
loadSprite('arrow', 'images/arrow.png')
loadSprite('specialOrder', 'images/specialOrder.png')
loadSprite('x', 'images/x.png')
loadSprite('window', 'images/window.png')

loadFont('font', './font.ttf')
loadFont('lightFont', 'Bai_Jamjuree/BaiJamjuree-Medium.ttf')

loadSound('bell', 'sfx/bell.mp3')
loadSound('plop', 'sfx/plop.mp3')
loadSound('start', 'sfx/start.mp3')
loadSound('music', 'music.mp3')


var quotes = [
    "Keep flipping those burgers, \neven if the flames of your dreams \nare slowly dying.",
    "Serving fast food is like serving \ndisappointment with a side of fries. \nEmbrace the mediocrity!",
    "Remember, no one really expects\n greatness from fast food. You're just \npart of the processed machine.",
    "Every order you serve is a reminder\n of the fleeting nature of life's joy.\n Keep pushing those nuggets!",
    "While others chase their dreams, \nyou're stuck serving the drive-thru.\n Embrace the despair, my friend!",
]
var ingredients = [
    'lettuce',
    'tomato',
    'patty',
    'topBun',
    'guacamole',
    'pickles'
]

var ingredientsInRecipe = [
    'lettuce',
    'tomato',
    'patty',
    'guacamole',
    'pickles'
]

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function floating() {
    return {
        // Initialize the component
        add() {
            this.origY = this.pos.y; // Store the original y position
            this.offset = Math.random() * 20; // Set a random offset for the floating motion
        },
        // Update the component
        update() {
            // Apply the floating animation
            this.pos.y = this.origY + Math.sin((time()) + this.offset) * 10; // Adjust the floating motion as desired
        },
    };
}

function blinking() {
    let timer = 0;
    return {
        // Component initialization

        // Component update function
        update() {

            if (debug.fps() > 1) {

                timer += 1 / debug.fps();
                if (timer >= 0.5) {
                    this.hidden = !this.hidden;
                    timer = 0;
                }

            }

        },
    };
};


const effects = {

    light: () => ({
        "u_radius": 200,
        "u_blur": 300,
        "u_resolution": vec2((1128 * 1.25), 615 * 1.25),
        "u_mouse": center(),
    }),
}
//vec2(bottomBun.pos.x, center().y)
for (const effect in effects) {
    loadShaderURL(effect, null, `${effect}.frag`)
}


const music = play('music', {
    volume: 0.3,
    loop: true
})

scene('game', (difficulty) => {

    var level = 1

    var isPaused = false;
    var order = []
    var recipe;
    var score = 1;
    var numOrders = 1;
    var specialOrder = false;
    var strikes = difficulty == 'HARD' || difficulty == 'SUPERHARD' ? 1 : 3
    var xList = []
    var multiplyer = difficulty == 'SUPERHARD' ? 2 : 1
    setGravity(700 * multiplyer)

    var transition = add([
        rect(width(), height()),
        z(100000),
        opacity(1)
    ])

    var endingScreen = add([
        rect(width()/2, height() / 1.1, {
            radius: 50        
        }),
        anchor('center'),
        color(BLACK),
        pos(center().x, -height() / 2),
        z(1000)
    ])
    
    var endBody = endingScreen.add([
        rect(width()/2-50, height() / 1.1-50, {
            radius: 30
        }),
        color("#A5E78D"),
        anchor('center'),

    ])

    endBody.add([
        text("YOU LOST\n:(", {
            font: 'font',
            size: 120,
            align: 'center',
        }),
        pos(0, -100),
        anchor('center')
    ])
/*
    endingScreen.add([
        text(quotes[Math.floor(Math.random() * quotes.length)], {
            font: 'font',
            size: 50,
            align: 'center'
        }),
        anchor('center'),
        pos(0, -100),
        floating(),

    ])
*/
    var goBackMenu = endingScreen.add([
        text('GO BACK to MENU', {
            font: 'font',
            size: 40
        }),
        anchor('center'),
        rotate(0),
        area(),
        pos(0, 200),
        'unPausable',

    ])

    var restartBackMenu = endingScreen.add([
        text('RESTART', {
            font: 'font',
            size: 40

        }),
        anchor('center'),
        rotate(0),
        area(),
        pos(0, 130),
        'unPausable',

    ])

    goBackMenu.onClick(async () => {
        await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
            go('menu')
        })
    })


    restartBackMenu.onClick(async () => {
        await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
            go('game', difficulty)
        })
    })

    var background = add([
        sprite('background'),
        rotate(45),
        anchor('center'),
        pos(center()),
        scale(0.8),
        color()

    ])



    add([
        rect(width() / 1.3, 250),
        pos(width() / 2, height() / 1.2),
        anchor('center'),
        outline(10)
    ])

    var specialOrderLabel = add([
        sprite('specialOrder'),
        anchor('center'),
        blinking(),
        pos(center()),
        scale(0.4),
        z(1000)
    ])

    volume(0.5)

    onDraw(() => {
        drawLine({
            p1: vec2(0, center().y - 200),
            p2: vec2(width(), center().y - 200),
            width: 4,
            color: rgb(0, 0, 0),
            z: 0
        })

    })

    var ready = add([
        sprite('bell'),
        pos(center().x - 300, center().y + 80),
        anchor('center'),
        scale(0.2),
        //animate(1, 0.01),
        area({
            scale: vec2(0.8, 0.7)
        })
    ])

    function specialRequest() {

        specialOrder = true;

        var recipes = get('recipe')


        recipes.forEach(r => {

            destroy(r);
        })

        var r = []


        for (let i = 0; i < level; i++) {
            r.push(ingredientsInRecipe[Math.floor(Math.random() * ingredientsInRecipe.length)]);

        }

        var st = 'Top Bun\n'
        let reversedOrder = [...r].reverse()
        reversedOrder.forEach(element => {
            st += `${element} \n`
        })

        st += 'Bottom Bun\n'

        let border = add([
            rect(950, 1350, {
                radius: 60
            }),
            anchor('center'),
            pos(-100),
            //move(180, -90),
            color(BLACK),
            scale(0.25),
            area(),
            {
                ingre: r
            },
            'recipe',
        ])
        border.add([
            rect(800, 1200, {
                radius: 40
            }),
            anchor('center'),

        ])

        tween(border.pos, vec2(width() - 200, center().y), 0.5, (p) => border.pos = p, easings.easeInBack)


        border.add([
            text(st, {
                align: 'center',
                font: 'lightFont',

            }),
            anchor('center'),
            area(),
            color(BLACK),
            scale(3),
            pos(0, 100)

        ])

        recipe = {
            text: border.ingre,
            obj: border
        };

        ingredients = [...border.ingre, 'topBun']
        ingredientIndex = 0;
        shuffle(ingredients)
        border.unuse('move'),
            tween(border.pos, vec2(width() - 200, center().y), 0.5, (p) => border.pos = p, easings.easeInBack)
        tween(border.scale, vec2(0.25), 0.5, (p) => border.scale = p, easings.easeInSine)


    }

    wait((Math.random() * 10) + 40, () => {
        loop((Math.random() * 60) + 60, () => {
            specialRequest()
        })
    })

    // READY

    ready.onClick(async () => {

        if (recipe != null && !isPaused) {

            var points = 0;

            specialOrder = false;
            //tween(recipe.obj.pos, vec2(width() + 300, recipe.obj.pos.y), 1, (p) => recipe.obj.pos = p, easings.easeInSine)
            recipe.obj.destroy()

            //destroyAll('ingredient');

            //debug.log(recipe.text)

            for (let i = 0; i < recipe.text.length; i++) {
                if (order[i] != null) {
                    if (recipe.text[i].includes(order[i])) {
                        points += 1;
                    }
                }
            }

            if (level < 6) {
                level += (points / recipe.text.length) / 3
            }

            score += (points / recipe.text.length) * 5;
            //debug.log(`${order}            ${recipe.text}`)

            if (strikes != 0) {
                var strikeObj = xList[strikes - 1]

                if (points != recipe.text.length) {
                    strikeObj.opacity = 1
                    strikes -= 1
                }
            }

            recipe = null;
            numOrders++;


            play('bell', {
                volume: 3,
                seek: 0.3
            })

            get('ingredient').forEach(element => {
                if (element.isGrounded()) {
                    tween(element.pos, vec2(width() + 300, element.pos.y), 1, (p) => element.pos = p, easings.easeInSine)
                }
            });

            await tween(bottomBun.pos, vec2(width() + 300, bottomBun.pos.y), 1, (p) => bottomBun.pos = p, easings.easeInSine).then(() => {
                bottomBun.pos = vec2(-300, bottomBun.pos.y)
                tween(bottomBun.pos, vec2(center().x, bottomBun.pos.y), 1, (p) => bottomBun.pos = p, easings.easeInSine);
            })

        }
    })

    loop(10, () => {

        addRecipe()
    })

    for (let i = 0; i < 6; i++) {
        add([
            rect((1301 * 0.250832693) / 1.5, (307 * 0.250832693) / 1.36),
            area(),
            pos(center().x, (445 - ((i * 307) / 5))),
            anchor('center'),
            color(RED),
            outline(10),
            opacity(0),
            'layer'
        ])
    }

    var layers = get('layer')

    var scoreLabelBorder = add([
        rect(450, 100),
        outline(5),
        pos(width() - 200, 100),
        anchor('center')
    ])

    for (var i = 0; i < strikes; i++) {

        if (difficulty == 'EASY') break

        let xObj = scoreLabelBorder.add([
            sprite('x'),
            pos(strikes != 1 ? (550 / 5) - i * 125 : 0, 0),
            anchor('center'),
            scale(0.075),
            opacity(0.3)
        ])

        xList.push(xObj)
    }

    var scoreLabel = scoreLabelBorder.add([
        text(`Score: ${score}/5`, {
            font: 'lightFont',
            size: 40
        }),
        anchor('center'),
        color(BLACK)
    ])

    scoreLabel.hidden = difficulty != 'EASY'

    scoreLabel.onUpdate(() => {

        scoreLabel.text = `Score: ${Math.floor(score / numOrders)} Star(s)`
    })

    var bottomBun = add([
        sprite('bottomBun'),
        pos(width() / 2, height() / 1.5),
        anchor('center'),
        //area({scale: vec2(2,2)}),
        area(),
        body({
            isStatic: true
        }),

        scale(0.376249039 / 2),
    ])

    var pauseButton = add([
        sprite('pause'),
        anchor('center'),
        pos(width() - 50, height() - 50),
        area(),
        scale(1),
        'unPausable',
        z(1000)
    ])

    const pauseMenuBorder = add([
        rect(350, 450, {
            radius: 50
        }),
        pos(center().add(0, 700)),
        anchor("center"),
        z(10000),
        color(BLACK),
        area(),
        'unPausable',


    ])

    const pauseMenu = pauseMenuBorder.add([
        rect(300, 400, {
            radius: 30
        }),
        color("#FF8585"),
        anchor("center"),
        area(),
        'unPausable',

    ])

    pauseMenu.add([
        text('GAME \nPAUSED', {
            font: 'font',
            align: 'center'
        }),
        anchor('center'),
        scale(1.3)
    ])

    var pauseMenuTitleScreen = pauseMenu.add([
        pos(0, 170),
        text('BACK to MENU', {
            font: 'font'
        }),
        anchor('center'),
        area()
    ])

    var resume = pauseMenu.add([
        pos(0, 120),
        text('RESUME', {
            font: 'font'
        }),
        anchor('center'),
        area()
    ])


    pauseMenuTitleScreen.onClick(async () => {
        await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
            go('menu')
        })

    })

    resume.onClick(() => {
        pause()
    })

    pauseButton.onClick(() => {
        pause()
    })

    var recipeHolder = add([
        rect(800 * 0.1, 1200 * 0.1),
        area({
            collisionIgnore: ['ingredient']
        }),
        scale(1),
        pos(vec2(width() - 200, center().y)),
        opacity(0),
        anchor('center')
    ])


    recipeHolder.onCollide('recipe', (a) => {
        recipe = {
            text: a.ingre,
            obj: a
        };
    })

    recipeHolder.onCollideEnd('recipe', (a) => {
        recipe = null

    })

    const effect = Object.keys(effects)[0]

    usePostEffect(effect, effects[effect]())


    function addRecipe() {

        get('recipe').forEach((rec) => {

            if (rec.pos == vec2(width() - 200, center().y)) {
                destroy(rec)
            }
        })

        var r = []


        for (let i = 0; i < level; i++) {
            r.push(ingredientsInRecipe[Math.floor(Math.random() * ingredientsInRecipe.length)]);

        }

        var st = 'Top Bun\n'
        let reversedOrder = [...r].reverse()
        reversedOrder.forEach(element => {
            st += `${element} \n`
        })

        st += 'Bottom Bun\n'

        let border = add([
            rect(950, 1350, {
                radius: 60,
            }),
            anchor('center'),
            pos(-100, center().y - 200),
            move(180, -90),
            color(rgb(0, 0, 0)),
            scale(0.2),
            area(),
            {
                ingre: r
            },
            'recipe',
        ])

        border.add([
            rect(800, 1200, {
                radius: 40,
            }),
            anchor('center'),

        ])


        border.add([
            text(st, {
                align: 'center',
                font: 'lightFont',

            }),
            anchor('center'),
            area(),
            color(BLACK),
            scale(3),
            pos(0, 100)

        ])
        /*
                border.add([
                    sprite('clickHere'),
                    anchor('center'),
                    scale(),
                    rotate(45),
                    opacity()
                ])*/


    }
    /*
        wait(60, () => [
            loop(60, () => {
                let border = add([
                    sprite('paper'),
                    anchor('center'),
                    pos(-100, center().y - 200),
                    move(180, -90),
                    //color(rgb(200, 200, 200)),
                    scale(0.2),
                    area(),
                    'AD',
                ])
    
    
                border.add([
                    text('Get a 5 Star Review! (AD)', {
                        align: 'center',
                        font: 'font',
    
                    }),
                    anchor('center'),
                    area(),
                    color(BLACK),
                    scale(3),
                    pos(0, 100)
    
                ])
            })
        ])*/

    var ingredientIndex = 0;

    tween(transition.opacity, 0, 1, (p) => transition.opacity = p, easings.easeInSine)
    /*
        onClick('AD', (a) => {
            const callbacks = {
                adFinished: () => {
                    unpause()
    
                    var previousLevel = level;
                    level = 1;
    
                    wait(30, () => {
                        level = previousLevel;
                        debug.log(previousLevel)
                    })
                    destroy(a)
                },
                adError: (error) => {
                    unpause()
    
                },
                adStarted: () => {
                    console.log("Start rewarded ad (callback)")
                    pause()
                },
            };
            window.CrazyGames.SDK.ad.requestAd("rewarded", callbacks);
    
        })
        */

    onClick('recipe', async (a) => {
        if (recipe == null && a.children.length > 0 && !a.paused) {



            ingredients = [...a.ingre, 'topBun']
            ingredientIndex = 0;
            shuffle(ingredients)
            a.unuse('move'),
                tween(a.pos, vec2(width() - 200, center().y), 0.5, (p) => a.pos = p, easings.linear)
            tween(a.scale, vec2(0.25), 0.5, (p) => a.scale = p, easings.easeInSine)
            /*
                        await tween(a.children[0].opacity, 0, 0.5, (p) => a.children[0].opacity = p, easings.linear).then(() => {
                            destroy(a.children[0])
                        })
            */

        }
    })

    loop(2 / level, () => {

        if (ingredients.length > 0) {
            //Math.floor(Math.random() * ingredients.length)
            var ty = ingredients[ingredientIndex].replace(' ', '')
            var mat = add([
                sprite(ty.replace('\n', '')),
                pos(Math.floor(Math.random() * width()), -100),
                anchor('center'),
                body({
                    maxVelocity: ((Math.random() * 200) + 600) * multiplyer,
                    stickToPlatform: false
                }),
                //area({scale: vec2(2,2)}),
                area({
                    shape: new Rect(vec2(0), 1301, 307),
                    collisionIgnore: [ty.replace('\n', '') == 'topBun' ? 'layer' : null]

                }),

                offscreen({
                    destroy: true
                }),
                scale(0.376249039 / 2),
                'ingredient',
                {
                    type: ty
                }


            ])

            if (ingredientIndex >= ingredients.length - 1) {

                ingredientIndex = 0
            } else {
                ingredientIndex += 1
            }

        }

    })

    /*

    onCollideUpdate('layer', 'ingredient', (a, b) => {
        var index = layers.indexOf(a);

        order[index] = b.type


    })
    */

    onCollideEnd('layer', 'ingredient', (c, d) => {
        var index = layers.indexOf(c);

        if (order[index] == d.type) order[index] = null
    })

    var heldIngredient;

    var endingIsTweening = false
    onUpdate(async () => {

        let dt = 0;
        var groundedIngredients = [];

        if (debug.fps() > 1) {
            dt = 1 / debug.fps();
        }

        get('recipe').forEach(r => {
            if (recipe != null || recipe != undefined) {

                if (recipe.obj == r) {
                    r.scale.x += (0.25 - r.scale.x) * dt
                    r.scale.y += (0.25 - r.scale.y) * dt
                }
            } else {
                r.scale = vec2((Math.sin(time())/30) + 0.2)

            }


            //r.height = (Math.sin(time())*100) + 1200
        })

        if (specialOrder) {

            tween(background.color, rgb("#FF8585"), 1, (c) => background.color = c, easings.linear)

            specialOrderLabel.paused = false;
            specialOrderLabel.opacity = 1;

        } else {
            tween(background.color, WHITE, 1, (c) => background.color = c, easings.linear)
            specialOrderLabel.paused = true;
            specialOrderLabel.opacity = 0;
        }

        if (strikes == 0) {

            if (!endingIsTweening) {
                await tween(endingScreen.pos.y, center().y, 1, (y) => endingScreen.pos.y = y, easings.easeInSine).then(() => {
                    endingIsTweening = true
                })
            }

            if (endingScreen.pos.y == center().y) {
                const allObjs = get('*')
                allObjs.forEach((obj) => {
                    obj.paused = !obj.is('unPausable')

                })
            }


        }

        get('recipe').forEach((r) => {

            if (r.pos.x > width() + 200) {
                numOrders += 1;
                destroy(r)

                if (difficulty != 'EASY' && strikes != 0) {
                    var strikeObj = xList[strikes - 1]
                    strikeObj.opacity = 1
                    strikes -= 1
                }

            }
        })

        get('ingredient').forEach(async ingredient => {
            if (ingredient.isClicked() && heldIngredient == null) {


                heldIngredient = ingredient;

                wait(0, () => {
                    play('plop', {
                        seek: 0.023,
                        detune: 500,
                        volume: 0.8
                    })
                })

                tween(ingredient.scale, vec2(0.376249039 / 1.5), 1, (s) => ingredient.scale = s, easings.easeOutElastic)

                var particleColor;

                switch (ingredient.type) {
                    case 'topBun':
                    case 'patty':
                        particleColor = rgb(196, 164, 132);
                        break;
                    case 'tomato':
                        particleColor = rgb("#FF6B6B");
                        break;
                    case 'guacamole':
                    case 'lettuce':
                    case 'pickles':

                        particleColor = GREEN;
                        break;
                    default:
                        particleColor = BLACK; // Set a default color if the ingredient doesn't match any specified cases
                        break;
                }

                for (let particle = 0; particle < 5; particle++) {
                    const item = ingredient.add([
                        rect(20, 20),
                        anchor('center'),
                        scale(rand(3, 6)),
                        area({ collisionIgnore: ['particle', 'ingredient'] }),
                        body(),
                        pos(),
                        lifespan(1, { fade: 0.5 }),
                        opacity(1),
                        move(choose([LEFT, RIGHT]), rand(720, 720 * 2)),
                        color(particleColor),
                        //                        follow(ingredient),
                        'particle',
                    ])

                    item.jump(rand(320, 640))
                }

            }

            if (!isMouseDown('left')) {
                tween(ingredient.scale, vec2(0.376249039 / 2), 0.1, (s) => ingredient.scale = s, easings.easeOutSine)

                heldIngredient = null;
            }

            if (ingredient.isGrounded()) {
                groundedIngredients.push({
                    i: ingredient.type,
                    y: ingredient.pos.y
                })
            }

        });



        if (heldIngredient != null || heldIngredient != undefined) {
            heldIngredient.pos = mousePos();


        }

        groundedIngredients.sort((a, b) => b.y - a.y);
        
        order = groundedIngredients.map(item => item.i)

        //if (recipe) debug.log(`${order} ${recipe.text}`)

        /*
                for (let a = 0; a < layers.length; a++) {
                    if (layers[a].getCollisions().length >= 1) {
                        order[a] = layers[a].getCollisions()[0].source.type
                        debug.log(layers[a].getCollisions().source)
                    } else {
                        order[a] = null 
                    }
                }
        */
        //debug.log(order)
    })
    var curTween;


    pauseMenu.hidden = true
    pauseMenu.paused = true

    function pause() {
        const allObjs = get('*')
        isPaused = !isPaused
        allObjs.forEach((obj) => {
            obj.paused = !obj.paused
        })
        if (curTween) curTween.cancel()
        curTween = tween(
            // start value (accepts number, Vec2 and Color)
            pauseMenuBorder.pos,
            // destination value
            isPaused ? center() : vec2(center().x, height() + 250),
            // duration (in seconds)
            isPaused ? 1 : 0.5,
            // how value should be updated
            (p) => pauseMenuBorder.pos = p,
            // interpolation function (defaults to easings.linear)
            isPaused ? easings.easeOutElastic : easings.linear,
        )
        if (isPaused) {
            pauseMenu.hidden = false
            pauseMenu.paused = false
        } else {
            curTween.onEnd(() => {
                pauseMenu.hidden = true
                pauseMenu.paused = true
            })
        }

        var unPausable = get('unPausable')

        unPausable.forEach(element => {
            element.pause = false;
        });
    }

    function unpause() {
        const allObjs = get('*')
        isPaused = false;
        allObjs.forEach((obj) => {
            obj.paused = false
        })
        if (curTween) curTween.cancel()
        curTween = tween(
            // start value (accepts number, Vec2 and Color)
            pauseMenuBorder.pos,
            // destination value
            isPaused ? center() : vec2(center().x, height() + 500),
            // duration (in seconds)
            0.5,
            // how value should be updated
            (p) => pauseMenuBorder.pos = p,
            // interpolation function (defaults to easings.linear)
            easings.easeOutElastic,
        )
        if (isPaused) {
            pauseMenu.hidden = false
            pauseMenu.paused = false
        } else {
            curTween.onEnd(() => {
                pauseMenu.hidden = true
                pauseMenu.paused = true
            })
        }

        var unPausable = get('unPausable')

        unPausable.forEach(element => {
            element.pause = false;
        });
    }


})

scene('menu', () => {

    var transition = add([
        rect(width(), height()),
        z(100000),
        opacity(1)
    ])

    tween(transition.opacity, 0, 1, (p) => transition.opacity = p, easings.easeInSine)


    ingredients = [
        'lettuce',
        'tomato',
        'patty',
        'topBun',
        'guacamole',
        'pickles'
    ]

    var background = add([
        sprite('background'),
        anchor('center'),
        pos(center()),
        scale(0.8),
        rotate(45),
        color()

    ])

    var titleBackground = add([
        rect(width()/2, height() / 1.1, {
            radius: 50        
        }),
        anchor('center'),
        color(BLACK),
        pos(center()),
    ])
    
    titleBackground.add([
        rect(width()/2-50, height() / 1.1-50, {
            radius: 30
        }),
        color("#A5E78D"),
        anchor('center'),

    ])


    var playButtonBorder = add([
        rect(400, 100, {
            radius: 45,
        }),
        pos(center().x, center().y + 10),

        color(BLACK),
        anchor("center"),
        scale(1.25),
        floating()

    ])

    var playButton = playButtonBorder.add([
        rect(360, 60, {
            radius: 30,
        }),
        pos(),
        anchor('center'),
        color("#4ECDC4"),
        z(1000),
        area(),

    ])

    playButton.add([
        text("play!", {
            font: "font"
        }),
        anchor('center')
    ])

    // TUT
    var tutorialBorder = add([
        rect(400, 100, {
            radius: 45,
        }),
        pos(center().x, center().y - 30),

        color(BLACK),
        anchor("center"),
        scale(1.25),

    ])

    var tutorial = tutorialBorder.add([
        rect(360, 60, {
            radius: 30,
        }),
        pos(),
        anchor('center'),
        color("#FF6B6B"),
        z(1000),
        area(),

    ])

    tutorial.add([
        text("help mee!", {
            font: "font"
        }),
        anchor('center')
    ])



    tutorial.onUpdate(() => {
        tutorialBorder.pos.y = playButtonBorder.pos.y + 135
    })

    var difficultyLevelHolder = add([
        rect(300, 350),
        pos(0 - 155, playButtonBorder.pos.y),
        anchor('center'),
        outline(5),
        z(100000 - 2),
    ])



    var easy = difficultyLevelHolder.add([
        rect(285, 100),
        pos(0, -115),
        area(),
        
        //color(rgb('#87ff7c')),
        color("#4ECDC4"),

        anchor('center'),
        outline(5),
        'difficulty',
        'easy'

    ])

    easy.add([
        text('easy!', {
            font: 'font'
        }),
        anchor('center'),
    ])

    var medium = difficultyLevelHolder.add([
        rect(285, 100),
        pos(0, 0),
        area(),
        color(rgb(255, 165, 0)),
        anchor('center'),
        outline(5),
        'difficulty',
        'medium'
    ])

    medium.add([
        text('medium!!', {
            font: 'font'
        }),
        anchor('center'),
        color(WHITE),
    ])


    var hard = difficultyLevelHolder.add([
        rect(285, 100),
        pos(0, 115),
        color(RED),
        area(),
        anchor('center'),
        outline(5),
        'difficulty',
        'hard'

    ])

    hard.add([
        text('hard!!!', {
            font: 'font'
        }),
        anchor('center'),
        color(WHITE)
    ])



    onClick('difficulty', async (b) => {
        if (b.paused) return

        var difficulty = 'medium'.toUpperCase()
        if (b.is('easy')) difficulty = 'medium'.toUpperCase()
        if (b.is('medium')) difficulty = 'hard'.toUpperCase()
        if (b.is('hard')) difficulty = 'superHard'.toUpperCase()

        play('bell', {
            seek: 0.32
        })

        await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
            go('game', difficulty);
        })
    })


    difficultyLevelHolder.children.forEach((ch) => {
        ch.paused = true
    })
    difficultyLevelHolder.paused = true

    playButton.onClick(async () => {
        /*
        play('bell', {
            seek: 0.3
        })
        await tween(transition.opacity, 1, 1, (p) => transition.opacity = p, easings.easeInSine).then(() => {
            go('game');
        })
        */

        tween(difficultyLevelHolder.pos.x, difficultyLevelHolder.paused ? playButtonBorder.pos.x + 450 : width() + 255, 1,
            (x) => difficultyLevelHolder.pos.x = x,
            difficultyLevelHolder.paused ? easings.easeOutElastic : easings.easeInSine
        )

        difficultyLevelHolder.paused = !difficultyLevelHolder.paused

        difficultyLevelHolder.children.forEach((ch) => {
            ch.paused = !ch.paused

        })

    })

    const tutorialMenu = add([
        rect(width() / 1.5, height() / 1.5),
        color(255, 255, 255),
        outline(20),
        anchor("center"),
        pos(center().x, height() + (height() / 1.5)),
        'unPausable',
        z(100000 - 1),
        { index: 0 }
    ])

    var closeTutorial = tutorialMenu.add([
        text('Close', {
            font: 'lightFont',
        }),
        color(BLACK),
        anchor('center'),
        pos(400, -220),
        area(),
    ])

    var recipeHelp = tutorialMenu.add([
        text('Click                     to Select a Recipe', {
            font: 'lightFont'
        }),
        color(BLACK),
        anchor('center'),
        'recipeHelp'
    ])

    var makingHelp = tutorialMenu.add([
        text('Make Burgers From Ingredients \nthat Fall From the Celling\nORDER MATTERS!!!', {
            font: 'lightFont',
            align: 'center'
        }),
        color(BLACK),
        anchor('center'),
        'makingHelp'
    ])

    var finishHelp = tutorialMenu.add([
        text('Press                      to Serve', {
            font: 'lightFont'
        }),
        color(BLACK),
        anchor('center'),
        'finishHelp'
    ])

    finishHelp.add([
        sprite('bell'),
        scale(0.2),
        anchor('center'),
        pos(-20, 0)
    ])

    recipeHelp.hidden = true;

    var rPlaceholder = recipeHelp.add([
        rect(800, 1200),
        scale(0.2),
        pos(-100, 0),
        scale(0.2),
        anchor('center'),
        outline(30)

    ])

    rPlaceholder.add([
        text('Top Bun\nPatty\nBottom Bun', {
            align: 'center',
            font: 'lightFont',

        }),
        anchor('center'),
        area(),
        color(BLACK),
        scale(3),
        pos(0, 100)

    ])



    var leftArrow = tutorialMenu.add([
        sprite('arrow'),
        anchor('center'),
        color(BLACK),
        pos(-400, 0),
        scale(-0.02, 0.02),
        area()
    ])

    var rightArrow = tutorialMenu.add([
        sprite('arrow'),
        anchor('center'),
        color(BLACK),
        pos(400, 0),
        scale(0.02, 0.02),
        area()
    ])

    closeTutorial.onClick(() => {
        tween(tutorialMenu.pos.y, height() + (height() / 1.5), 0.5, (y) => tutorialMenu.pos.y = y, easings.linear)

    })

    tutorial.onClick(() => {
        tween(tutorialMenu.pos.y, center().y, 1, (y) => tutorialMenu.pos.y = y, easings.easeOutElastic)
    })

    tutorialMenu.onUpdate(() => {
        tutorialMenu.children.forEach(element => {
            if (element.is('recipeHelp')) {
                if (tutorialMenu.index == 0) {
                    element.hidden = false;
                } else {
                    element.hidden = true;
                }
            }

            if (element.is('makingHelp')) {
                if (tutorialMenu.index == 1) {
                    element.hidden = false;
                } else {
                    element.hidden = true;
                }
            }

            if (element.is('finishHelp')) {
                if (tutorialMenu.index == 2) {
                    element.hidden = false;
                } else {
                    element.hidden = true;
                }
            }
        });

        if ((isKeyPressed('left') || leftArrow.isClicked()) && tutorialMenu.index > 0) {
            tutorialMenu.index -= 1;
        }

        if ((isKeyPressed('right') || rightArrow.isClicked()) && tutorialMenu.index < 2) {
            tutorialMenu.index += 1;
        }
    })

    var title = add([
        sprite('title'),
        anchor('center'),
        scale(0.35),
        pos(center().x, 200),
        z(1000),
        floating()

    ])

    setGravity(700)


    let ingredientIndex = 0;

    loop(1, () => {

        if (ingredients.length > 0) {


            //Math.floor(Math.random() * ingredients.length)
            var ty = ingredients[ingredientIndex].replace(' ', '')
            var mat = add([
                sprite(ty.replace('\n', '')),
                pos(Math.floor(Math.random() * width()), -100),
                anchor('center'),
                body({
                    maxVelocity: (Math.random() * 200) + 600,
                    stickToPlatform: false
                }),
                //area({scale: vec2(2,2)}),
                area(),
                offscreen({
                    destroy: true
                }),
                scale(0.376249039 / 1.5),
                z(0)


            ])
            if (ingredientIndex >= ingredients.length - 1) {

                ingredientIndex = 0
            } else {
                ingredientIndex += 1
            }

        }

    })

})

go('menu')
