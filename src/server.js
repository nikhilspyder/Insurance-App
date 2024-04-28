const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });
const app = express();
const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
const short = require('short-uuid');

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'insuranceApp',
// });

// mongoose.connect('mongodb://localhost:27017/insurance', { useNewUrlParser: true, useUnifiedTopology: true });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});


const upload = multer({ storage });

class User {
    constructor(uid,username, password, usertype) {
      this.uid = uid;
      this.username = username;
      this.password = password;
      this.usertype = usertype;
    }
  }

  // Function to generate a unique 3-character request ID
function generateRequestID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Use characters for the ID
  let requestID = '';
  for (let i = 0; i < 3; i++) {
    requestID += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return requestID;
}



class healthModel {
  constructor(data) {
    this.requestID = data.requestID;
    this.uid = data.uid;
    this.userType = data.userType;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.age = data.age;
    this.gender = data.gender;
    this.smoker = data.smoker;
    this.annualIncome  = data.annualIncome,
    this.marriageStatus  = data.marriageStatus,
    this.zipCode  = data.zipCode,
    this.preExistingConditions = data.preExistingConditions;
    this.coverageAmount = data.coverageAmount;
    this.idDocument = data.idDocument;
    this.status = data.status || 'Submitted'; // default value
    this.type = data.type || 'Health'; // default value
  }
}

class AutoInsuranceModel {
  constructor(data) {
    this.requestID = data.requestID;
    this.uid = data.uid;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.age = data.age;
    this.gender = data.gender;
    this.vehicleMake = data.vehicleMake;
    this.vehicleModel = data.vehicleModel;
    this.vehicleYear = data.vehicleYear;
    this.vehicleValue = data.vehicleValue;
    this.coverageAmount = data.coverageAmount;
    this.vehicleType = data.vehicleType;
    this.milesDriven = data.milesDriven;
    this.zipCode = data.zipCode;
    this.status = data.status || 'Submitted'; // default value
    this.type = data.type || 'Auto'; // default value
  }
}


// app.use('/uploads', express.static(__dirname + '/src/uploads'));

// Serve static files from the 'uploads' folder
// app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

// Route for downloading files
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'src', '/uploads', filename);

  // Send the file for download
  res.download(filePath, (err) => {
    if (err) {
      // Handle errors such as file not found
      console.error('Error downloading file:', err);
      res.status(404).send('File not found');
    }
  });
});

// Function to index data into Elasticsearch
async function indexHealthInsurance(data) {
  try {
      const response = await client.index({
          index: 'healthinsurance', // Index name
          body: data
      });
      console.log(`Indexed health insurance data with ID: ${response}`);
  } catch (error) {
      console.error('Error indexing health insurance data:', error);
  }
}

// Function to index data into Elasticsearch for auto insurance
async function indexAutoInsurance(data) {
  try {
      const response = await client.index({
          index: 'autoinsurance', // Index name for auto insurance
          body: data
      });
      console.log(`Indexed auto insurance data with ID: ${response}`);
  } catch (error) {
      console.error('Error indexing auto insurance data:', error);
  }
}

app.post('/api/healthInsurance', upload.single('idDocument'), async (req, res) => {
  // Generate a unique request ID
  const requestID = generateRequestID();
  const {
      uid,
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      smoker,
      annualIncome,
      marriageStatus,
      zipCode,
      preExistingConditions,
      coverageAmount,
  } = req.body;

  let restructuredPath;

if (req.file) {
    const { path } = req.file;
    // You can perform any restructuring or additional processing of the path here if needed
    restructuredPath = path;
} else {
    // Handle the case where req.file is not available
    restructuredPath = ''; // Or whatever default value you want to assign
}// Uploaded file path

  try {
      const newHealthInsurance = new healthModel({
          requestID,
          uid,
          firstName,
          lastName,
          email,
          phone,
          age,
          gender,
          smoker,
          annualIncome,
          marriageStatus,
          zipCode,
          preExistingConditions,
          coverageAmount,
          idDocument: restructuredPath, // Save the file path in MongoDB
          status: 'Submitted',
          type: 'Health',
      });

      // Index data into Elasticsearch
      await indexHealthInsurance(newHealthInsurance);

      res.status(201).send('Request added successfully');
  } catch (error) {
      console.error('Error adding health insurance request:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.post('/api/autoInsurance', async (req, res) => {
  // Generate a unique request ID
  const requestID = generateRequestID();
  const {
      uid,
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      vehicleValue,
      coverageAmount,
      vehicleType,
      milesDriven,
      zipCode,
  } = req.body;

  try {
      const newAutoInsurance = new AutoInsuranceModel({
          requestID,
          uid,
          firstName,
          lastName,
          email,
          phone,
          age,
          gender,
          vehicleMake,
          vehicleModel,
          vehicleYear,
          vehicleValue,
          coverageAmount,
          vehicleType,
          milesDriven,
          zipCode,
          status: 'Submitted',
          type: 'Auto',
      });

      // Index data into Elasticsearch or perform any other necessary processing
      // Index data into Elasticsearch
      await indexAutoInsurance(newAutoInsurance);
      res.status(201).send('Request added successfully');
  } catch (error) {
      console.error('Error adding auto insurance request:', error);
      res.status(500).send('Internal Server Error');
  }
});


  // app.post('/api/healthInsurance', async (req, res) => {
  //   const {
  //       uid,
  //       userType,
  //       firstName,
  //       lastName,
  //       email,
  //       phone,
  //       age,
  //       gender,
  //       smoker,
  //       preExistingConditions,
  //       coverageAmount,
  //       status,
  //   } = req.body;
  
  //   try {
  //     const healthInsurance = new healthModel({
  //       uid,
  //       userType,
  //       firstName,
  //       lastName,
  //       email,
  //       phone,
  //       age,
  //       gender,
  //       smoker,
  //       preExistingConditions,
  //       coverageAmount,
  //       status,
  //     });
  
  //     await healthInsurance.save();
  //     res.status(201).send('Request added successfully');
  //   } catch (error) {
  //     console.error('Error adding review:', error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });



// Assuming you have already set up the Elasticsearch client (`esClient`)

app.get('/api/healthInsurance', async (req, res) => {
  try {
    // Query Elasticsearch for health insurance records
    const body = await client.search({
      index: 'healthinsurance', // Index name
      body: {
        query: {
          match_all: {} // Match all documents
        }
      }
    });

    // Extract hits from the search response
    // console.log('led',body)
    const healthInsurances = body.hits.hits.map(hit => hit._source);

    if (!healthInsurances || healthInsurances.length === 0) {
      return res.status(404).json({ message: 'No health insurance records found' });
    }

    res.status(200).json(healthInsurances);
  } catch (error) {
    console.error('Error retrieving health insurance records:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/autoInsurance', async (req, res) => {
  try {
    // Query Elasticsearch for auto insurance records
    const body = await client.search({
      index: 'autoinsurance', // Index name for auto insurance
      body: {
        query: {
          match_all: {} // Match all documents
        }
      }
    });

    // Extract hits from the search response
    const autoInsurances = body.hits.hits.map(hit => hit._source);

    if (!autoInsurances || autoInsurances.length === 0) {
      return res.status(404).json({ message: 'No auto insurance records found' });
    }

    res.status(200).json(autoInsurances);
  } catch (error) {
    console.error('Error retrieving auto insurance records:', error);
    res.status(500).send('Internal Server Error');
  }
});

  //Get all insurances for an agent
//   app.get('/api/healthInsurance', async (req, res) => {
//     try {  
//         const healthInsurances = await healthModel.find();
//         if (!healthInsurances || healthInsurances.length === 0) {
//             return res.status(404).json({ message: 'No health insurance records found' });
//         }
//         res.status(200).json(healthInsurances);
//     } catch (error) {
//         console.error('Error retrieving health insurance records:', error);  
//         res.status(500).send('Internal Server Error');
//     }
// });

// // GET endpoint to retrieve health insurance records by uid
// app.get('/api/user/healthInsurance', async (req, res) => {
//   const { uid } = req.query;

//   try {
//     // Validate uid parameter
//     if (!uid) {
//       return res.status(400).json({ message: 'UID parameter is required' });
//     }

//     // Find health insurance records by uid
//     const healthInsurances = await healthModel.find({ uid });

//     // Check if any records are found
//     if (!healthInsurances || healthInsurances.length === 0) {
//       return res.status(404).json({ message: 'No health insurance records found for this user' });
//     }

//     // Return the found health insurance records
//     res.status(200).json(healthInsurances);
//   } catch (error) {
//     console.error('Error retrieving health insurance records:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// GET endpoint to retrieve health insurance records by uid
app.get('/api/user/healthInsurance', async (req, res) => {
  const { uid } = req.query;

  try {
    // Validate uid parameter
    if (!uid) {
      return res.status(400).json({ message: 'UID parameter is required' });
    }

    // Query Elasticsearch for health insurance records by uid
    const body = await client.search({
      index: 'healthinsurance', // Index name
      body: {
        query: {
          match: { uid } // Match documents where uid field equals the provided uid
        }
      }
    });
    console.log('here', body)

    // Extract hits from the search response
    const healthInsurances = body.hits.hits.map(hit => hit._source);

    // Check if any records are found
    if (!healthInsurances || healthInsurances.length === 0) {
      return res.status(404).json({ message: 'No health insurance records found for this user' });
    }

    // Return the found health insurance records
    res.status(200).json(healthInsurances);
  } catch (error) {
    console.error('Error retrieving health insurance records:', error);
    res.status(500).send('Internal Server Error');
  }
});

//ENDPOINT TO GET BOTH HEALTH AND AUTO INSURANCES FOR A USER /USER/REQUEST

// Route to search for insurance records by UID
// app.get('/api/user/insurance', async (req, res) => {
//   const { uid } = req.query;

//   try {
//     // Validate UID parameter
//     if (!uid) {
//       return res.status(400).json({ message: 'UID parameter is required' });
//     }

//     // Make separate requests to Elasticsearch to search in both indices
//     const [healthInsuranceResults, autoInsuranceResults] = await Promise.all([
//       searchInsuranceByIndex('healthinsurance', uid),
//       searchInsuranceByIndex('autoinsurance', uid)
//     ]);

//     // Combine the results from both searches
//     const combinedResults = [...healthInsuranceResults, ...autoInsuranceResults];

//     // Return the combined results to the client
//     res.status(200).json(combinedResults);
//   } catch (error) {
//     console.error('Error searching insurance records:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Function to search for insurance records in a specific index by UID
// async function searchInsuranceByIndex(index, uid) {
//   const response = await axios.post(`http://localhost:9200/${index}/_search`, {
//     query: {
//       match: { uid }
//     }
//   });
//   return response.data.hits.hits.map(hit => hit._source);
// }

// // Start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // PATCH endpoint to update the status of a health insurance record by requestID
// app.patch('/api/healthInsurance/:requestID', async (req, res) => {
//   const { requestID } = req.params;
//   const { status } = req.body;

//   try {
//     // Validate requestID parameter
//     if (!requestID) {
//       return res.status(400).json({ message: 'RequestID parameter is required' });
//     }

//     // Validate status parameter
//     if (!status) {
//       return res.status(400).json({ message: 'Status parameter is required' });
//     }

//     // Find the health insurance record by requestID
//     const healthInsurance = await healthModel.findOne({ requestID });

//     // Check if the health insurance record exists
//     if (!healthInsurance) {
//       return res.status(404).json({ message: 'Health insurance record not found' });
//     }

//     // Update the status of the health insurance record
//     healthInsurance.status = status;
//     await healthInsurance.save();

//     // Return the updated health insurance record
//     res.status(200).json({ message: 'Status updated successfully', healthInsurance });
//   } catch (error) {
//     console.error('Error updating health insurance status:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// PATCH endpoint to update the status of a health insurance record by requestID
app.patch('/api/healthInsurance/status/:requestID', async (req, res) => {
  const { requestID } = req.params;
  const { status } = req.body;

  try {
    // Validate requestID parameter
    if (!requestID) {
      return res.status(400).json({ message: 'RequestID parameter is required' });
    }

    // Validate status parameter
    if (!status) {
      return res.status(400).json({ message: 'Status parameter is required' });
    }

    // Update the status of the health insurance record by requestID
    const body = await client.search({
      index: 'healthinsurance', // Index name
      body: {
        query: {
          match: { requestID: requestID } // Match documents where requestID field equals the provided requestID
        }
      }
    });
    
    console.log('body', body)

    // Check if any documents are found
    if (body.hits.total.value === 0) {
      return res.status(404).json({ message: 'Health insurance record not found' });
    }


    // Extract the document ID from the search response
    const documentId = body.hits.hits[0]._id;
    console.log('docDID', documentId);
    console.log('docDID', status);
    // Update the status of the health insurance record by document ID
    const updateResponse = await client.update({
      index: 'healthinsurance', // Index name
      id: documentId, // Document ID
      body: {
        doc: {
          status: status
        }
      }
    });

    console.log('docDID', updateResponse);

    // Check if the record was successfully updated
    // Check if the record was successfully updated
if (updateResponse.result === 'updated' || updateResponse.result === 'noop') {
  return res.status(200).json({ message: 'Status updated successfully' });
} else {
  return res.status(404).json({ message: 'Health insurance record not found' });
}
    // Return the updated health insurance record
    // res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating health insurance status:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.patch('/api/autoInsurance/status/:requestID', async (req, res) => {
  const { requestID } = req.params;
  const { status } = req.body;

  try {
    // Validate requestID parameter
    if (!requestID) {
      return res.status(400).json({ message: 'RequestID parameter is required' });
    }

    // Validate status parameter
    if (!status) {
      return res.status(400).json({ message: 'Status parameter is required' });
    }

    // Update the status of the auto insurance record by requestID
    const body = await client.search({
      index: 'autoinsurance', // Index name
      body: {
        query: {
          match: { requestID: requestID } // Match documents where requestID field equals the provided requestID
        }
      }
    });

    // Check if any documents are found
    if (body.hits.total.value === 0) {
      return res.status(404).json({ message: 'Auto insurance record not found' });
    }

    // Extract the document ID from the search response
    const documentId = body.hits.hits[0]._id;

    // Update the status of the auto insurance record by document ID
    const updateResponse = await client.update({
      index: 'autoinsurance', // Index name
      id: documentId, // Document ID
      body: {
        doc: {
          status: status
        }
      }
    });

    // Check if the record was successfully updated
    if (updateResponse.result === 'updated' || updateResponse.result === 'noop') {
      return res.status(200).json({ message: 'Status updated successfully' });
    } else {
      return res.status(404).json({ message: 'Auto insurance record not found' });
    }
  } catch (error) {
    console.error('Error updating auto insurance status:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch quotes based on requestID
app.get('/api/healthInsurance/quotes/:requestId', async (req, res) => {
  const requestId = req.params.requestId;
  try {
      const body = await client.search({
          index: 'healthinsurance',
          body: {
              query: {
                  match: {
                      'requestID': requestId
                  }
              }
          }
      });

      if (body.hits.total.value === 1) {
          const quotes = body.hits.hits[0]._source.quotes;
          res.status(200).json({ quotes });
      } else {
          res.status(404).json({ error: 'Quotes not found for the given requestId' });
      }
  } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// API endpoint to fetch quotes based on requestID
app.get('/api/autoInsurance/quotes/:requestId', async (req, res) => {
  const requestId = req.params.requestId;
  try {
      const body = await client.search({
          index: 'autoinsurance',
          body: {
              query: {
                  match: {
                      'requestID': requestId
                  }
              }
          }
      });

      if (body.hits.total.value === 1) {
          const quotes = body.hits.hits[0]._source.quotes;
          res.status(200).json({ quotes });
      } else {
          res.status(404).json({ error: 'Quotes not found for the given requestId' });
      }
  } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// // API endpoint to update document with health insurance quotes
// app.post('/api/healthInsurance/quotes', async (req, res) => {
//   const { requestId, quotes } = req.body;
// console.log(requestId, quotes)
//   try {
//       const response = await client.update({
//           index: 'healthinsurance', // Index name
//           id: requestId, // Document ID (requestID)
//           body: {
//               doc: {
//                   quotes: quotes // Add the quotes field to the document
//               }
//           }
//       });

//       res.status(200).json({ message: 'Document updated successfully', response });
//   } catch (error) {
//       console.error("Error updating document:", error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// API endpoint to update document with health insurance quotes
app.post('/api/healthInsurance/quotes', async (req, res) => {
  const { requestID, quotes } = req.body;
  console.log(requestID, quotes);
  try {
      // Use Elasticsearch search to find the document with matching requestID
      const body = await client.search({
          index: 'healthinsurance',
          body: {
              query: {
                    match: { requestID: requestID }
              }
          }
      });

      // Check if any documents matched the query
      console.log('Akash', body);
      if (body.hits.total.value === 1) {
          const documentId = body.hits.hits[0]._id;

          // Update the document with the new quotes
          const response = await client.update({
              index: 'healthinsurance',
              id: documentId,
              body: {
                  doc: {
                      quotes: quotes
                  }
              }
          });

          res.status(200).json({ message: 'Document updated successfully', response });
      } else {
          res.status(404).json({ error: 'Document not found' });
      }
  } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to update document with auto insurance quotes
app.post('/api/autoInsurance/quotes', async (req, res) => {
  const { requestID, quotes } = req.body;
  console.log(requestID, quotes);
  try {
      // Use Elasticsearch search to find the document with matching requestID
      const body = await client.search({
          index: 'autoinsurance', // Change index to 'autoinsurance'
          body: {
              query: {
                    match: { requestID: requestID }
              }
          }
      });

      // Check if any documents matched the query
      console.log('Akash', body);
      if (body.hits.total.value === 1) {
          const documentId = body.hits.hits[0]._id;

          // Update the document with the new quotes
          const response = await client.update({
              index: 'autoinsurance', // Change index to 'autoinsurance'
              id: documentId,
              body: {
                  doc: {
                      quotes: quotes
                  }
              }
          });

          res.status(200).json({ message: 'Document updated successfully', response });
      } else {
          res.status(404).json({ error: 'Document not found' });
      }
  } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// // API endpoint to fetch quotes based on requestID
// app.get('/api/healthInsurance/quotes/:requestId', async (req, res) => {
//   const requestId = req.params.requestId;
//   try {
//       const { body: searchResponse } = await client.search({
//           index: 'healthinsurance',
//           body: {
//               query: {
//                   match: {
//                       'requestID': requestId
//                   }
//               }
//           }
//       });

//       console.log(' Inside 1');

//       if (searchResponse.hits.total.value === 1) {
//           const quotes = searchResponse.hits.hits[0]._source.quotes;
//           res.status(200).json({ quotes });
//       } else {
//           res.status(404).json({ error: 'Quotes not found for the given requestId' });
//       }
//   } catch (error) {
//       console.error("Error fetching quotes:", error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // API endpoint to fetch quotes based on requestID for auto insurance
// app.get('/api/autoInsurance/quotes/:requestId', async (req, res) => {
//   const requestId = req.params.requestId;
//   try {
//       const { body: searchResponse } = await client.search({
//           index: 'autoinsurance', // Assuming 'autoinsurance' is the index name for auto insurance data
//           body: {
//               query: {
//                   match: {
//                       'requestID': requestId
//                   }
//               }
//           }
//       });

//       if (searchResponse.hits.total.value === 1) {
//           const quotes = searchResponse.hits.hits[0]._source.quotes;
//           res.status(200).json({ quotes });
//       } else {
//           res.status(404).json({ error: 'Quotes not found for the given requestId' });
//       }
//   } catch (error) {
//       console.error("Error fetching quotes:", error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.post('/api/registerUser', (req, res) => {
//     const { username, password, repassword, usertype } = req.body;
  
//     const registerUserQuery =
//       'INSERT INTO registration (username, password, repassword, usertype) VALUES (?, ?, ?, ?)';
  
//     db.query(registerUserQuery, [username, password, repassword, usertype], (err, result) => {
//       if (err) {
//         console.error('Error registering user:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.status(200).send('User registered successfully');
//       }
//     });
//   });

// app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
  
//     const selectUserQuery = 'SELECT * FROM registration WHERE username = ? AND password = ?';
  
//     db.query(selectUserQuery, [username, password], (err, results) => {
//       if (err) {
//         console.error('Error selecting user:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         console.log(results)
//         if (results.length > 0) {
//           const user = new User(
//             results[0].uid,
//             results[0].username,
//             results[0].password,
//             results[0].usertype
//           );
//           console.log(user);
//           res.send({
//             status:200,
//             message:"Login Successful",
//             data:{user}
//           });
//         //   res.status(200).json({ user });
//         } else {
//           res.status(401).send('Invalid credentials');
//         }
//       }
//     });
    
//   });



// app.post('/api/registerUser', async (req, res) => {
//     try {
//         const { username, password, repassword, usertype } = req.body;

//         // Generate a unique ID for the user
//         const userId = uuidv4();
//         console.log(userId)

//         // Index the user data into Elasticsearch
//         await client.index({
//             index: 'users',
            
//             body: {
//                 uid: userId,
//                 username,
//                 password,
//                 repassword,
//                 usertype
//             }
//         });

//         res.status(200).send('User registered successfully');
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// Endpoint to handle payment submission and update Elasticsearch
app.post('/api/insurance/payment', async (req, res) => {
  try {
      // Extract selected quote and payment details from request body
      const { selectedQuote, paymentDetails } = req.body;

      // Extract requestID from the selected quote
      const requestID = selectedQuote.requestID;

      // Query Elasticsearch to find the document with the matching requestID
      const body = await client.search({
        index: 'healthinsurance',
        body: {
            query: {
                  match: { requestID: requestID }
            }
        }
    });
    console.log('Jemis',body);
      // Extract the document ID from the search response
      const documentID = body.hits.hits[0]._id;
      

      // Update the document in Elasticsearch with selected quote and payment details
      const updateResponse  = await client.update({
          index: 'healthinsurance', // Replace with your Elasticsearch index name
          id: documentID,
          body: {
              doc: {
                  selectedQuote,
                  paymentDetails
              }
          }
      });

      // Check if the update was successful
      if (updateResponse.result === 'updated') {
          console.log('Document updated successfully');
          return res.status(200).json({ message: 'Payment details updated successfully' });
      } else {
          console.error('Failed to update document:', updateResponse);
          return res.status(500).json({ message: 'Failed to update payment details' });
      }
  } catch (error) {
      console.error('Error updating payment details:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/insurance/autopayment', async (req, res) => {
  try {
      // Extract selected quote and payment details from request body
      const { selectedQuote, paymentDetails } = req.body;

      // Extract requestID from the selected quote
      const requestID = selectedQuote.requestID;

      // Query Elasticsearch to find the document with the matching requestID
      const body = await client.search({
        index: 'autoinsurance',
        body: {
            query: {
                  match: { requestID: requestID }
            }
        }
    });
    console.log('Jemis',body);
      // Extract the document ID from the search response
      const documentID = body.hits.hits[0]._id;
      

      // Update the document in Elasticsearch with selected quote and payment details
      const updateResponse  = await client.update({
          index: 'autoinsurance', // Replace with your Elasticsearch index name
          id: documentID,
          body: {
              doc: {
                  selectedQuote,
                  paymentDetails
              }
          }
      });

      // Check if the update was successful
      if (updateResponse.result === 'updated') {
          console.log('Document updated successfully');
          return res.status(200).json({ message: 'Payment details updated successfully' });
      } else {
          console.error('Failed to update document:', updateResponse);
          return res.status(500).json({ message: 'Failed to update payment details' });
      }
  } catch (error) {
      console.error('Error updating payment details:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Endpoint to fetch user's insurance based on UID
app.get('/api/insurance/user/:uid', async (req, res) => {
  const { uid } = req.params;
console.log('uid', uid)
  // Query Elasticsearch to find the document with the matching UID
  const body = await client.search({
      index: 'healthinsurance', // Replace with your Elasticsearch index name
      body: {
          query: {
              match: {
                  'uid': uid
              }
          }
      }
  });

  // Extract the insurance data from the search response
  const insuranceData = body.hits.hits.map(hit => hit._source);

  if (!insuranceData || insuranceData.length === 0) {
      return res.status(404).json({ message: 'No insurance found for the user' });
  }

  // Find if there is a selected insurance
  const selectedInsurance = insuranceData.find(insurance => insurance.selectedQuote);

  if (selectedInsurance) {
      return res.status(200).json(selectedInsurance);
  } else {
      return res.status(404).json({ message: 'No insurance was selected' });
  }
});


app.get('/api/insurance/auto/user/:uid', async (req, res) => {
  const { uid } = req.params;
console.log('uid', uid)
  // Query Elasticsearch to find the document with the matching UID
  const body = await client.search({
      index: 'autoinsurance', // Replace with your Elasticsearch index name
      body: {
          query: {
              match: {
                  'uid': uid
              }
          }
      }
  });

  // Extract the insurance data from the search response
  const insuranceData = body.hits.hits.map(hit => hit._source);

  if (!insuranceData || insuranceData.length === 0) {
      return res.status(404).json({ message: 'No insurance found for the user' });
  }

  // Find if there is a selected insurance
  const selectedInsurance = insuranceData.find(insurance => insurance.selectedQuote);

  if (selectedInsurance) {
      return res.status(200).json(selectedInsurance);
  } else {
      return res.status(404).json({ message: 'No insurance was selected' });
  }
});

app.post('/api/registerUser', async (req, res) => {
  try {
      const { username, password, repassword, usertype } = req.body;

      // Generate a unique short UUID for the user
      const userId = short.generate();
      console.log(userId)

      // Index the user data into Elasticsearch
      await client.index({
          index: 'users',
          body: {
              uid: userId,
              username,
              password,
              repassword,
              usertype
          }
      });

      res.status(200).send('User registered successfully');
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/api/login', async (req, res) => {
  try {
      const { username, password, usertype } = req.body;

      // Search for the user in Elasticsearch
      const body = await client.search({
          index: 'users',
          body: {
              query: {
                  bool: {
                      must: [
                          { match: { username } },
                          { match: { password } },
                          { match: { usertype } }
                      ]
                  }
              }
          }
      });

      console.log(body);

      if (!body || !body.hits || !body.hits.hits) {
          throw new Error('Invalid response from Elasticsearch');
      }

      const userHits = body.hits.hits;

      if (userHits.length > 0) {
          const user = userHits[0]._source;
          res.send({
              status: 200,
              message: "Login Successful",
              data: { user }
          });
      } else {
          res.status(401).send('Invalid credentials');
      }
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.get('/api/jsp-content', (req, res) => {
  // Logic to render your JSP file and send it as a response
  res.send(`
    <html>
      <head>
        <title>Stores</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </head>
      
      <style>
        /* Create four equal columns that float next to each other */
        .column {
          float: left;
          width: 100%;
          padding: 10px;
          height: auto;
        }
    
        .form-control {
          padding-top: 10px;
          width: 600px;
        }
    
        #map {
          height: 100vh;
        }
    
        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
        }
      </style>
    
      <body>
        <div class="row">
          <div class="col-sm-1">
          </div>
          <div class="col-sm-2">
            <div class="row">
              <div class="column" style="background-color:white;">
                <form>
                  <label for="fname">CraftsMan Services Hub</label><br>
                  <address id="address0"></address>
                  <button id="store" type="button" class="btn btn-success" value='0' onclick="change('1600 Amphitheatre Parkway, Mountain View, CA')">Select</button>
                </form>
              </div>
            </div>
            <br>
            <!-- Add more store locations with similar structure -->
          </div>
          <div class="col-sm-8">
            <div class="row mb-2">
              <div class="col-sm-12">
                <input class="form-control" id="ciudad" type="text" placeholder="Search ... " />
              </div>
            </div>
            <div id="map"></div>
          </div>
          <div class="col-sm-1">
          </div>
        </div>
      </div>
    
      <script>
        let map;
        let marianosMarker;
    
        function initMap() {
          const marianosLocation = { lat: 41.9445, lng: -87.6547 }; // Mariano's store in Chicago
          map = new google.maps.Map(document.getElementById('map'), {
            center: marianosLocation,
            zoom: 15, // You can adjust the zoom level as needed
          });
    
          // Add a marker for the Mariano's store
          marianosMarker = new google.maps.Marker({
            position: marianosLocation,
            map: map,
            title: "Mariano's - Chicago",
          });
    
          // Add an event listener to open an info window when the marker is clicked
          marianosMarker.addListener('click', function () {
            const infowindow = new google.maps.InfoWindow({
              content: '<strong>Mariano\'s - Chicago</strong>',
            });
            infowindow.open(map, marianosMarker);
          });
        }
    
        // Initialize a geocoder
        const geocoder = new google.maps.Geocoder();
    
        function geocodeAddress(address, callback) {
          geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK' && results[0]) {
              const location = results[0].geometry.location;
              callback(location);
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
    
        
        function change(address) {
          geocodeAddress(address, function (location) {
            map.setCenter(location);
            map.setZoom(15); // You can adjust the zoom level as needed
            // Place the marker at the new location
            marianosMarker.setPosition(location);
          });
        }
      </script>
    
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzX6Bj4xArtu8k9zUDFs2DlQRWM-nlZ4w&callback=initMap&libraries=places,geometry"
        async defer></script>
      </body>
      <br><br>
    </html>
  `);
});
  

  const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use(express.json());

app.get('/search', async (req, res) => {
  try {
    const apiKey = "2086a553ec2700eab5fc070b8253437325729dd6089471210b51d631a96e5734";
    const searchQuery = "Coffee";
    const url = `https://serpapi.com/search.json?engine=google_maps&q=${searchQuery}&ll=%4040.7455096%2C-74.0083012%2C14z&google_domain=google.com&hl=en&type=search&api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
