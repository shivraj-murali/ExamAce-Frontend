import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AIChatInterface from "./playground";

// Mock data for book subjects and books
// const SUBJECTS = [
//   "CSC601- Data Analytics and Visualization",
//   "CSC602- Cryptography and System Security",
//   "CSC603- Software Engineering and Project Management",
//   "CSC604- Machine Learning",
// ];

// const BOOKS = {
//   "CSC602- Cryptography and System Security": [
//     {
//       id: 1,
//       title: "Web Application Hackers Handbook",
//       cover:
//         "https://m.media-amazon.com/images/I/51mzEbU-nBL._UF1000,1000_QL80_.jpg",
//     },
//     {
//       id: 2,
//       title: "Notes on Cryptography",
//       cover:
//         "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/notes-template-design-9d18fb23558d6331c1f545bcb17fd6c3_screen.jpg?ts=1645871443",
//     },
//   ],
//   "CSC601- Data Analytics and Visualization": [
//     {
//       id: 3,
//       title:
//         " Data Science and Big Data Analytics: Discovering, Analyzing, Visualizing and Presenting Data,EMC Education services Wiley Publication",
//       cover: "https://m.media-amazon.com/images/I/61VdqcWYcxL.jpg",
//     },
//     {
//       id: 4,
//       title: "Notes on Data Analytics and Visualisation",
//       cover:
//         "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/notes-template-design-9d18fb23558d6331c1f545bcb17fd6c3_screen.jpg?ts=1645871443",
//     },
//   ],
//   "CSC603- Software Engineering and Project Management": [
//     {
//       id: 5,
//       title:
//         "Roger S. Pressman, Software Engineering: A practitioner's approach",
//       cover:
//         "https://m.media-amazon.com/images/I/816xr5ywK9L._AC_UF1000,1000_QL80_.jpg",
//     },
//     {
//       id: 6,
//       title: "Notes on SEPM",
//       cover:
//         "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/notes-template-design-9d18fb23558d6331c1f545bcb17fd6c3_screen.jpg?ts=1645871443",
//     },
//   ],
// };
const SUBJECTS = [
  "Operating Systems",
  "Machine Learning",
];

const BOOKS = {
  "Operating Systems": [
    {
      id: 1,
      title: "Operating systems design and implementation",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/7/71/Operating_Systems_Design_and_Implementation.jpg",
    },
    {
      id: 2,
      title: "Notes on OS",
      cover:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/notes-template-design-9d18fb23558d6331c1f545bcb17fd6c3_screen.jpg?ts=1645871443",
    },
  ],
  "Machine Learning": [
    {
      id: 3,
      title:
        "Machine Learning: An Algorithmic Perspective",
      cover: "https://m.media-amazon.com/images/I/61qWAvARI6L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 4,
      title: "Notes on Machine Learning",
      cover:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/notes-template-design-9d18fb23558d6331c1f545bcb17fd6c3_screen.jpg?ts=1645871443",
    },
  ],
};

const BookBrowsingApp = () => {
  const [selectedSubject, setSelectedSubject] = useState(
    "CSC601- Data Analytics and Visualization"
  );

  // Use navigate hook for routing
  const navigate = useNavigate();

  // Handler for book image click
  const handleBookClick = (book) => {
    // Log the book details to console
    console.log('Selected Book:', book);
    
    // Navigate to Chat interface with book information
    navigate('/chat', { 
      state: { 
        bookTitle: book.title,
        bookCover: book.cover,
        bookId: book.id
      } 
    });
  };

  // Get books for the selected subject, default to empty array if not found
  const booksForSubject = BOOKS[selectedSubject] || [];

  return (
    <div className="min-h-screen bg-[#24252b] py-8">
      <div className="container w-[80%] mx-auto px-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-white">
            ExamAce Library <span className="text-blue-500">📚</span>
          </h1>
        </div>

        {/* Subject Dropdown */}
        <div className="mb-12 max-w-2xl">
          <label
            htmlFor="subject-select"
            className="block mb-3 text-lg font-medium text-gray-200"
          >
            Select Your Subject
          </label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="
              w-full 
              p-3
              text-lg
              border 
              rounded-lg
              bg-[#1a1b1f]             
              text-gray-200        
              border-gray-700      
              hover:border-blue-500    
              focus:outline-none   
              focus:ring-2         
              focus:ring-blue-500  
              transition-all
              duration-200
              shadow-sm
            "
          >
            {SUBJECTS.map((subject) => (
              <option
                key={subject}
                value={subject}
                className="text-gray-200 bg-[#1a1b1f] py-2"
              >
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Book Thumbnail Grid or No Books Message */}
        {booksForSubject.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {booksForSubject.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-[#1a1b1f] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium">Click to start learning</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-200 text-lg line-clamp-2 mb-2">
                      {book.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                        Interactive Learning
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a1b1f] rounded-xl shadow-lg p-8 text-center border border-gray-700">
            <div className="text-gray-300 text-lg">
              No books available for this subject yet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookBrowsingApp;
