const Barbershop = require('../models/Barbershop');

exports.getAllBarbershops = async (req, res) => {
  try {
    const barbershops = await Barbershop.find();
    res.json(barbershops);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBarbershopById = async (req, res) => {
  try {
    const barbershop = await Barbershop.findById(req.params.id);
    if (!barbershop) {
      return res.status(404).json({ error: 'Barbershop not found' });
    }
    res.json(barbershop);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBarbershopProfessionals = async (req, res) => {
  try {
    const barbershop = await Barbershop.findById(req.params.id);
    if (!barbershop) {
      return res.status(404).json({ error: 'Barbershop not found' });
    }
    res.json(barbershop.professionals);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBarbershop = async (req, res) => {
  try {
    const { name, website, street, professionals, services, teamSize, hasNoAddress } = req.body;
    if (!teamSize) {
      return res.status(400).json({ error: 'teamSize is required.' });
  }
  const adminUsername = req.user.username; // Use the username from the authenticated user


    // Check for admin or higher role if your app requires
    if (req.user.status === 1) {
      return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
    }
    
    const barbershop = new Barbershop({
      name,
      website,
      street,
      professionals,
      services,
      teamSize,
      hasNoAddress,
      adminUsername,
    });

    await barbershop.save();
    res.status(201).json(barbershop);
  } catch (error) {
    console.error('Error creating barbershop:', error);
    res.status(400).json({ error: 'Failed to create barbershop. Please ensure all required fields are filled correctly.' });
  }
};


exports.deleteBarbershop = async (req, res) => {
  try {
    const barbershop = await Barbershop.findByIdAndDelete(req.params.id);
    if (!barbershop) {
      return res.status(404).json({ message: 'Barbershop not found' });
    }
    res.status(200).json({ message: 'Barbershop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Add a professional to a barbershop
exports.addProfessional = async (req, res) => {
  const { barbershopId, professionalName } = req.body;
  try {
    const barbershop = await Barbershop.findById(barbershopId);
    if (!barbershop) return res.status(404).json({ error: 'Barbershop not found' });

    // Avoid adding duplicates
    if (!barbershop.professionals.includes(professionalName)) {
      barbershop.professionals.push(professionalName);
      await barbershop.save();
    }

    res.json(barbershop);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.removeProfessional = async (req, res) => {
  const { barbershopId, professionalName } = req.body;
  try {
    const barbershop = await Barbershop.findById(barbershopId);
    if (!barbershop) return res.status(404).json({ error: 'Barbershop not found' });

    barbershop.professionals = barbershop.professionals.filter(professional => professional !== professionalName);
    await barbershop.save();

    res.json(barbershop);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBarbershopProfessionalsByAdmin = async (req, res) => {
  try {
    const barbershops = await Barbershop.find({ adminUsername: req.user.username });
    if (barbershops.length === 0) {
      return res.status(404).json({ error: 'No barbershops found for this admin.' });
    }
    
    const allProfessionals = barbershops.flatMap(barbershop => barbershop.professionals);
    res.json({ professionals: allProfessionals });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};


exports.addProfessionalByAdmin = async (req, res) => {
  const { professionalName } = req.body;
  try {
    const barbershop = await Barbershop.findOne({ adminUsername: req.user.username });
    if (!barbershop) {
      return res.status(404).json({ error: 'Barbershop not found for this admin' });
    }
    if (!barbershop.professionals.includes(professionalName)) {
      barbershop.professionals.push(professionalName);
      await barbershop.save();
      res.json({ message: 'Professional added successfully', professionals: barbershop.professionals });
    } else {
      res.status(400).json({ error: 'Professional already exists' });
    }
  } catch (error) {
    console.error('Error adding professional:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

