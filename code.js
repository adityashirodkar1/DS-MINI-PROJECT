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
                img: '/images/taj.jpg'
            },
            {
                what: 'Great Wall of China',
                img: '/images/wall.jpg' 
            },
            {
                what: 'Chichen Itza',
                img: '/images/aachi.jpg' 
            },
            {
                what: 'Petra',
                img: '/images/petra.jpg' 
            },
            {
                what: 'Machu Picchu',
                img: '/images/peru.jpg' 
            },
            {
                what: 'Christ the Redeemer',
                img: '/images/christ.jpg' 
            },
            {
                what: 'Colosseum',
                img: '/images/rome.jpg'
            }
        ],
        price: 450,
        quiz: null
    },
    {
        id: 2,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Mumbai',
        place: 'Mumbai',
        price: 464,
        quiz: null
    },
    {
        id: 3,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Sports',
        place: 'Dharamshala Stadium',
        reward: 100,
        price: 0,
        quiz:   [
                    {
                        question: "The famous football player Maradona belongs to which among the following countries?",
                        options: ['Brazil','Chile','Argentina','Italy'],
                        answer: 'Argentina'
                    },
                    {
                        question: "Which of the following Indian Sports Team is also known as “The Bhangra Boys?",
                        options: ['Cricket Team','Hockey Team','Kabaddi Team','Football Team'],
                        answer: 'Football Team'
                    },
                    {
                        question: "Which country has won the maximum number of medals in the all time history of Commonwealth Games?",
                        options: ['Australia','England','India','Canada'],
                        answer: 'Australia'
                    },
                    {
                        question: "What does the globe in the ICC World Cup Trophy symbolise?",
                        options: ['World','All participating nations','Cricket Ball','Unity'],
                        answer: 'Cricket Ball'
                    },
                    {
                        question: "Which organization awards the 'Pierre de Coubertin Medal'?",
                        options: ['The United Nations','The International Monetary Fund','The International Olympic Committee','The International Atomic Energy Agency'],
                        answer: 'The International Olympic Committee'
                    },
                    {
                        question: "Among the following athletes who won a gold medal for India in Olympics?",
                        options: ['PV Sindhu','Milkha Singh','Abhinav Bindra','Bajarang Punia'],
                        answer: 'Abhinav Bindra'
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
        quiz: null
    },
    {
        id: 6,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Art & Culture',
        place: 'Ram Setu',
        reward: 100,
        price: 0,
        quiz: [
            {
                question: "The birth anniversary of which social reformer was celebrated on January 3?",
                options: ['Narayana Guru','Vinoba Bhave','Pandita Ramabhai','Savitribai Phule'],
                answer: 'Savitribai Phule'
            },
            {
                question: "Which Indian monument has found place in the Shanghai Cooperation Organisation's '8 Wonders of SCO' list?",
                options: ['Taj Mahal','Statue of Unity','Konark Sun Temple','Ajanta Caves'],
                answer: 'Statue of Unity'
            },
            {
                question: "When is the national Tourism day celebrated across the country?",
                options: ['January 23','January 24','January 25','January 26'],
                answer: 'January 25'
            },
            {
                question: "What does the globe in the ICC World Cup Trophy symbolise?",
                options: ['World','All participating nations','Cricket Ball','Unity'],
                answer: 'Cricket Ball'
            },
            {
                question: "Which country recently set a Guinness World Record for the highest altitude fashion show event ever held?",
                options: ['China','Nepal','India','Brazil'],
                answer: 'Nepal'
            },
            {
                question: "Which film recently won the Oscar for best picture, which is also the first non- English film to win the award?",
                options: ['Les Misérables','Irishman','Parasite','Border'],
                answer: 'Parasite'
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
        quiz: null
    },
    {
        id: 8,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Jail',
        place: null,
        price: 0,
        quiz: null        
    },
    {
        id: 9,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Amritsar',
        place: 'Amritsar',
        price: 459,
        quiz: null
    },
    {
        id: 10,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Goa',
        place: 'Goa',
        price: 436,
        quiz: null
    },
    {
        id: 11,
        isPlayer1: false,
        isPlayer2: false,
        title: 'Science & Technology',
        place: 'Bengaluru',
        reward: 100,
        price: 0,
        quiz: [
            {
                question: "Which country recently launched a driver-less bullet train with the speed up to 350 km/h?",
                options: ['Japan','China','Singapore','USA'],
                answer: 'China'
            },
            {
                question: "Global code hosting platform GitHub, which recently launched its operations in India, is owned by which technological company?",
                options: ['Google','Microsoft','Amazon','Apple'],
                answer: 'Microsoft'
            },
            {
                question: "Which country has won the maximum number of medals in the all time history of Commonwealth Games?",
                options: ['Australia','England','India','Canada'],
                answer: 'Australia'
            },
            {
                question: "What does the globe in the ICC World Cup Trophy symbolise?",
                options: ['World','All participating nations','Cricket Ball','Unity'],
                answer: 'Cricket Ball'
            },
            {
                question: "Which organization awards the 'Pierre de Coubertin Medal'?",
                options: ['The United Nations','The International Monetary Fund','The International Olympic Committee','The International Atomic Energy Agency'],
                answer: 'The International Olympic Committee'
            },
            {
                question: "Among the following athletes who won a gold medal for India in Olympics?",
                options: ['PV Sindhu','Milkha Singh','Abhinav Bindra','Bajarang Punia'],
                answer: 'Abhinav Bindra'
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
        reward: 100,
        price: 0,
        quiz: [
            {
                question: "What is the full form of MOM ?",
                options: ['Moon Orbiter Mission ', 'Mars Orbiter Mission' , 'Mangalayan Orbital Mission', 'Mutliverse of Madness'],
                answer: 'Mars Orbiter Mission'
            },
            {
                question: "What is the full form of MOM ?",
                options: ['Moon Orbiter Mission ', 'Mars Orbiter Mission' , 'Mangalayan Orbital Mission', 'Mutliverse of Madness'],
                answer: 'Mars Orbiter Mission'
            }
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
