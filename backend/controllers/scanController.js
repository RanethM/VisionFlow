const Scan = require("../models/Scan");

// Save a new scan
exports.createScan = async (req, res) => {
  try {
    const { userId , imageUrl, detectedObjects, detectedText, bestGuess, correctedLabel, points } = req.body;

    // Create a new scan
    const scan = new Scan({
      userId, 
      imageUrl,
      detectedObjects,
      detectedText,
      bestGuess,
      correctedLabel: correctedLabel || null,
      points: points || 0
    });

    // Save to MongoDB
    const savedScan = await scan.save();

    res.status(201).json({
      success: true,
      scan: savedScan
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Getting all scans 

exports.getAllScans = async (req,res) => { 
   try{ 
    const scans = await Scan.find().sort({createdAt: -1}); 

    res.json({ 
      success:true ,
      count:scans.length, 
      scans
    })

   } catch (error ){ 
      res(500).json({sucess:false, message: error.message})
   }
}


// Getting the scans by the user ID 

exports.getScanByUser = async(req,res) => { 
  try{ 
    const{userId} =req.params // set this as a request parameter 

    const scans = await Scan.find({userId}).sort({createdAt: -1}) // This is used to find 

    res.json({ 
      success:true ,
      count:scans.length, 
      scans
    })


  } catch(error){

    res.status(500).json({success: false , message: error.message})

  }
}