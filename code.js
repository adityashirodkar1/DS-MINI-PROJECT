class LinkedList {
    size = 0
    head = null

    get isEmpty(){
        return this.size === 0
    }

    createNode(object){
        return {object, next: null}
    }

    push(object){
        const node = this.createNode(object)
        if(this.head === null){
            this.head = node
        } else{
            let ptr = this.getNodeAt(this.size - 1)
            ptr.next = node
        }
        this.size += 1
        return this.size;
    }

    getNodeAt(index){
        if(index === undefined || index < 0 || index > this.size) return null;
        if(index === 0) return this.head
        let ptr = this.head
        for(let i=0;i<index;i++){
            ptr = ptr.next
        }
        return ptr;
    }

    displayList(){
        let ptr = this.head
        for(let i=0;i<16;i++){
            console.log(ptr.object)
            ptr = ptr.next
        }
    }
}

class CircularLinkedList extends LinkedList{
    push(object){
        const node = this.createNode(object)
        if(this.head === null){
            this.head = node
        } else{
            let ptr = this.getNodeAt(this.size - 1)
            ptr.next = node
        }
        node.next = this.head
        this.size += 1
        return this.size;
    }

    blockWherePlayer1(){
        let ptr = this.head
        for(let i=0;i<16;i++){
            if(ptr.object.isPlayer1===true){
                return ptr;
            }
            ptr = ptr.next
        }
    }

    blockWherePlayer2(){
        let ptr = this.head
        for(let i=0;i<16;i++){
            if(ptr.object.isPlayer2===true){
                return ptr;
            }
            ptr = ptr.next
        }
    }

    rollPlayer1(die){
        let ptr = this.blockWherePlayer1()
        this.blockWherePlayer1().object.isPlayer1 = false
        for(let i=0;i<die;i++){
            ptr = ptr.next
        }
        ptr.object.isPlayer1 = true;
    }

    rollPlayer2(die){
        let ptr = this.blockWherePlayer2()
        this.blockWherePlayer2().object.isPlayer2 = false
        for(let i=0;i<die;i++){
            ptr = ptr.next
        }
        ptr.object.isPlayer2 = true;
    }

    triggerQuiz1(){
        if(this.blockWherePlayer1().object.title === 'Sports' || this.blockWherePlayer1().object.title === 'Art & Culture' || this.blockWherePlayer1().object.title === 'Science & Technology' || this.blockWherePlayer1().object.title === 'Universe' || this.blockWherePlayer1().object.title === 'Atlas'){
            return true
        }
        else{
            return false
        }
    }

    triggerQuiz2(){
        if(this.blockWherePlayer2().object.title === 'Sports' || this.blockWherePlayer2().object.title === 'Art & Culture' || this.blockWherePlayer2().object.title === 'Science & Technology' || this.blockWherePlayer2().object.title === 'Universe' || this.blockWherePlayer2().object.title === 'Atlas'){
            return true
        }
        else{
            return false
        }
    }

    teleport1(where){
        let ptr = this.head
        for(let i=0;i<16;i++){
            if(ptr.object.title===where){
                return ptr;
            }
            ptr = ptr.next
        }
    }

    toJail(){
        let ptr = this.head
        for(let i=0;i<16;i++){
            if(ptr.object.title==='Jail'){
                return ptr;
            }
            ptr = ptr.next
        }
    }
}

const list = new CircularLinkedList();

blocks = [
    {
        id: 0,
        isPlayer1: true,
        isPlayer2: true,
        title: 'START',
        place: null,
        price: 0,
        quiz: null
        
    },
    {
        id: 1,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Atlas',
        place: [
            {
                what: 'Taj Mahal', 
                img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668785623/dsMp/taj_avkybc.jpg',
                hint: 'If you really want a hint for this place then I suggest you to leave this country.'
            },
            {
                what: 'Great Wall of China',
                img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668785566/dsMp/wall_vbjxvd.jpg' ,
                hint: 'Located in China. It was used for defense, border controls, allowing the imposition of duties on goods transported along the Silk Road, regulation or encouragement of trade and the control of immigration and emigration.'
            },
            {
                what: 'Chichen Itza',
                img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668785596/dsMp/aachi_nwl4ed.jpg',
                hint: 'Located in Mexico. It was a large pre-Columbian city built by the Maya people of the Terminal Classic period.' 
            },
            {
                what: 'Petra',
                img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668785459/dsMp/petra_v9xvlm.jpg',
                hint: "Located in southern Jordan (probably won't help you that much). Originally known to its inhabitants as Raqmu or Raqēmō, is a historic and archaeological city. It is adjacent to the mountain of Jabal Al-Madbah (yeah this won't help you either)." 
            },
            {
                what: 'Machu Picchu',
                img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668785496/dsMp/peru_kzt4am.jpg',
                hint: "Located in Eastern Cordillera of southern Peru. Well you can say that it can be spelled like a particular Pokemon......I guess. (If you have not watch pokemon then that's your fault)"
            },
            {
                what: 'Christ the Redeemer',
                img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668785532/dsMp/christ_w1iyt6.jpg',
                hint: 'Located in Rio de Janeiro, Brazil. Created by French sculptor Paul Landowski and built by Brazilian engineer Heitor da Silva Costa, in collaboration with French engineer Albert Caquot. If you are a football fan then you must know this.' 
            },
            {
                what: 'Colosseum',
                img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668781807/dsMp/rome_zweklp.jpg',
                hint: 'Located in the centre of the city of Rome, Italy, just east of the Roman Forum. Synonym of huge'
            }
        ],
        reward: 300,
        quiz: null
    },
    {
        id: 2,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Mumbai',
        place: 'Mumbai',
        price: 464,
        rent: 65,
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668803792/dsMp/vikram-B_ufwLFEZPE-unsplash_omsidz.jpg',
        quiz: null
    },
    {
        id: 3,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Sports',
        place: 'Dharamshala Stadium',
        reward: 100,
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668841674/dsMp/jannes-glas-0NaQQsLWLkA-unsplash_g0x0dj.jpg',
        price: 0,
        quiz:   [
                    {
                        question: "The famous football player Maradona belongs to which among the following countries?",
                        options: ['Brazil','Chile','Argentina','Italy'],
                        answer: 'Argentina',
                        reward: 110
                    },
                    {
                        question: "Which of the following Indian Sports Team is also known as “The Bhangra Boys?",
                        options: ['Cricket Team','Hockey Team','Kabaddi Team','Football Team'],
                        answer: 'Football Team',
                        reward: 120
                    },
                    {
                        question: "Which country has won the maximum number of medals in the all time history of Commonwealth Games?",
                        options: ['Australia','England','India','Canada'],
                        answer: 'Australia',
                        reward: 105
                    },
                    {
                        question: "What does the globe in the ICC World Cup Trophy symbolise?",
                        options: ['World','All participating nations','Cricket Ball','Unity'],
                        answer: 'Cricket Ball',
                        reward: 100
                    },
                    {
                        question: "Which organization awards the 'Pierre de Coubertin Medal'?",
                        options: ['The United Nations','The International Monetary Fund','The International Olympic Committee','The International Atomic Energy Agency'],
                        answer: 'The International Olympic Committee',
                        reward: 90
                    },
                    {
                        question: "Among the following athletes who won a gold medal for India in Olympics?",
                        options: ['PV Sindhu','Milkha Singh','Abhinav Bindra','Bajarang Punia'],
                        answer: 'Abhinav Bindra',
                        reward: 100
                    }
                ]
    },
    {
        id: 4,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Power Up',
        place: null,
        price: 0,
        quiz: null
    },
    {
        id: 5,
        isPlayer1: false,
        isPlayer2: false,
        title: 'New Delhi',
        place: 'New Delhi',
        price: 440,
        rent: 45,
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668803733/dsMp/new-delhi-india-_dpdmya.jpg',
        quiz: null
    },
    {
        id: 6,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Art & Culture',
        place: 'Ram Setu',
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668841708/dsMp/ahmad-odeh-UYtEI-acsuY-unsplash_bnp8y0.jpg',
        price: 0,
        quiz: [
            {
                question: "The birth anniversary of which social reformer was celebrated on January 3?",
                options: ['Narayana Guru','Vinoba Bhave','Pandita Ramabhai','Savitribai Phule'],
                answer: 'Savitribai Phule',
                reward: 100
            },
            {
                question: "Which Indian monument has found place in the Shanghai Cooperation Organisation's '8 Wonders of SCO' list?",
                options: ['Taj Mahal','Statue of Unity','Konark Sun Temple','Ajanta Caves'],
                answer: 'Statue of Unity',
                reward: 105
            },
            {
                question: "When is the national Tourism day celebrated across the country?",
                options: ['January 23','January 24','January 25','January 26'],
                answer: 'January 25',
                reward: 110
            },
            {
                question: "Ratna Ojha, who recently passed away was a theatre artist and activist of which state?",
                options: ['Odisha', 'Meghalaya', 'Assam', 'West Bengal'],
                answer: 'Assam',
                reward: 150
            },
            {
                question: "Which country recently set a Guinness World Record for the highest altitude fashion show event ever held?",
                options: ['China','Nepal','India','Brazil'],
                answer: 'Nepal',
                reward: 120
            },
            {
                question: "Which film recently won the Oscar for best picture, which is also the first non- English film to win the award?",
                options: ['Les Misérables','Irishman','Parasite','Border'],
                answer: 'Parasite',
                reward: 105
            }
        ]
    },
    {
        id: 7,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Pune',
        place: 'Pune',
        price: 448,
        rent: 50,
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668803650/dsMp/336491271Pune_Shaniwar_Wada_dzrf2x.jpg',
        quiz: null
    },
    {
        id: 8,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Jail',
        place: null,
        price: 0,
        fine: 50,
        img: '',
        quiz: null        
    },
    {
        id: 9,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Amritsar',
        place: 'Amritsar',
        price: 459,
        rent: 55,
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668803775/dsMp/ravi-n-jha-aU9yXmIwfkw-unsplash_g7plgm.jpg',
        quiz: null
    },
    {
        id: 10,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Goa',
        place: 'Goa',
        price: 436,
        rent: 40,
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668803680/dsMp/ashutosh-saraswat-CXyz3qljaH8-unsplash_kt8d3u.jpg',
        quiz: null
    },
    {
        id: 11,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Science & Technology',
        place: 'Bengaluru',
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668841727/dsMp/alexandre-debieve-FO7JIlwjOtU-unsplash_tlcdcv.jpg',
        price: 0,
        quiz: [
            {
                question: "Which country recently launched a driver-less bullet train with the speed up to 350 km/h?",
                options: ['Japan','China','Singapore','USA'],
                answer: 'China',
                reward: 120
            },
            {
                question: "Global code hosting platform GitHub, which recently launched its operations in India, is owned by which technological company?",
                options: ['Google','Microsoft','Amazon','Apple'],
                answer: 'Microsoft',
                reward: 110
            },
            {
                question: "BioAsia is an annual biotech and life sciences forum of which State Government?",
                options: ['Odisha', 'Telangana', 'Kerala', 'Andhra Pradesh'],
                answer: 'Telangana',
                reward: 110
            },
            {
                question: "'ASK DISHA' is an online chat-bot of which Indian organisation?",
                options: ['IRCTC -Indian Railways Catering and Tourism Corporation', 'NPCI- National Payments Corporation of India', 'RBI- Reserve Bank of India', 'SEBI- Securities Exchange Board of India'],
                answer: 'IRCTC -Indian Railways Catering and Tourism Corporation',
                reward: 100
            },
            {
                question: "Which major technology company has launched a new application named 'Sodar', to help people maintain distancing?",
                options: ['Facebook', 'Amazon', 'Google', 'Apple'],
                answer: 'Google',
                reward: 120
            },
            {
                question: "Where is Silicon Valley located?",
                options: ['Norway','Northern California','Switzerland','Southern California'],
                answer: 'Northern California',
                reward: 100
            }
        ]
    },
    {
        id: 12,
        isPlayer1: false,
        isPlayer2: false,
        title: '50/50',
        place: null,
        price: 0,
        quiz: null
    },
    {
        id: 13,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Chennai',
        place: 'Chennai',
        price: 460,
        rent: 60,
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668803581/dsMp/resizer_jt4s2r.jpg',
        quiz: null
    },
    {
        id: 14,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Monopoly Tax',
        place: null,
        price: 0,
        quiz: null
    },
    {
        id: 15,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Universe',
        place: 'DS Lab',
        img: 'https://res.cloudinary.com/dc4kfswj7/image/upload/v1668841695/dsMp/nasa-rTZW4f02zY8-unsplash_o0eoae.jpg',
        price: 0,
        quiz: [
            {
                question: "What is the full form of MOM?",
                options: ['Moon Orbiter Mission ', 'Mars Orbiter Mission' , 'Mangalayan Orbital Mission', 'Mutliverse of Madness'],
                answer: 'Mars Orbiter Mission',
                reward: 100,
            },
            {
                question: "How many natural satellites does Jupiter have?",
                options: ['65-70', '55-60', '85-90', '75-80'],
                answer: '75-80',
                reward: 110,
            },
            {
                question: "Who was the second person to step on Moon?",
                options: ['Buzz Aldrin', 'Edwin Eldrin', 'Valentina Tereshkova', 'Yuri Gagarin'],
                answer: 'Buzz Aldrin',
                reward: 140,
            },
            {
                question: "The largest volcano in the solar system is called Olympus Mons. Where is it?",
                options: ['Venus', 'Uranus', 'Mars', 'Jupiter'],
                answer: 'Mars',
                reward: 120,
            },
            {
                question: "Which planet in the solar system is said to be capable of floating on water?",
                options: ['Saturn', 'Uranus', 'Mars', 'Jupiter'],
                answer: 'Saturn',
                reward: 100,
            },
            {
                question: "How many constellations are recognized by the International Astronomical Union (IAU)?",
                options: ['81', '86', '69', '88'],
                answer: '88',
                reward: 140,
            },
        ]
    }
]

player1 = {
    points: 5000
}

player2 = {
    points: 5000
}

for(let i=0;i<16;i++){
    list.push(blocks[i])
}


module.exports = list
