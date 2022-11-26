import petition from '../modules/petition.js';

const petitionDao = {
  async createPetition(body) {
    const promise = new Promise(async (res, rej) => {
      try {
        (new petition({
          title: body.title,
          description: body.description,
          type: body.type,
          user: body.user,
          status: 'wating',
        })).save().then(result => {
          res({ petition: result });
        }).catch((error) => {
          console.log(error);
          rej({ error });
        });
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
  },
  async deletePetition(id) {
    const promise = new Promise(async (res, rej) => {
      try {
        petition.deleteOne({
          _id: id
        }).then(result => {
          res({ petition: result });
        }
        ).catch((error) => {
          console.log(error);
          rej({ error });
        }
        );
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
  },
  async updatePetition(id, body, image) {
    const promise = new Promise(async (res, rej) => {
      try { 
        petition.updateOne({
          _id: id
        }, {
          title: body.title,
          description: body.description,
          image: image,
          status: body.status,
        }).then(result => {
          res({ petition: result });
        })
        .catch((error) => {
          console.log(error);
          rej({ error });
        }
        );
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
  },
  async getPetition(id) {
    const promise = new Promise(async (res, rej) => {
      try {
        petition
          .findOne({
            _id: id
          })
          .then(result => {
            res({ petition: result });
          }
          ).catch((error) => {
            console.log(error);
            rej({ error });
          }
          );
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
  },
  async getAllPetition() {
    const promise = new Promise(async (res, rej) => {
      try {
        petition
          .find()
          .then(result => {
            res({ petition: result });
          }
          ).catch((error) => {
            console.log(error);
            rej({ error });
          }
          );
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
  },
  async AllAcceptedPetition() {
    const promise = new Promise(async (res, rej) => {
      try {
        petition
          .find({ status: 'accepted' })
          .then(result => {
            res({ petition: result });
          }
          ).catch((error) => {
            console.log(error);
            rej({ error });
          }
          );
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
    
  },
  async ALlRejectedPetition() {
    const promise = new Promise(async (res, rej) => {
      try {
        petition
          .find({ status: 'rejected' })
          .then(result => {
            res({ petition: result });
          }
          ).catch((error) => {
            console.log(error);
            rej({ error });
          }
          );
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
  },
  async AllWaitingPetition() {
    const promise = new Promise(async (res, rej) => {
      try {
        petition
          .find({ status: 'wating' })
          .then(result => {
            res({ petition: result });
          }
          ).catch((error) => {
            console.log(error);
            rej({ error });
          }
          );
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
  },
  async mostSignedPetition() {
    const promise = new Promise(async (res, rej) => {
      try {
        petition
          .find({ status: 'accepted' })
          .sort({ signed: -1 })
          .then(result => {
            res({ petition: result });
          }
          ).catch((error) => {
            console.log(error);
            rej({ error });
          }
          );
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const petition = await promise;
      return { petition };
    }
    catch (error) {
      return { error };
    }
  }

}

export default petitionDao;

