package com.stackroute.sangeet.service;

import com.stackroute.sangeet.domain.Track;
import com.stackroute.sangeet.exception.TrackAlreadyExistException;
import com.stackroute.sangeet.exception.TrackNotFoundException;
import com.stackroute.sangeet.repository.SangeetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SangeetServiceImpl implements SangeetService {

    private SangeetRepository sangeetRepository;
    private Track track;

    @Autowired
    public SangeetServiceImpl(final SangeetRepository sangeetRepository) {
        this.sangeetRepository = sangeetRepository;
    }

    public SangeetServiceImpl() {
    }

    //save tracks into list//
    @Override
    public Track saveTrackToWishList(Track track) throws TrackAlreadyExistException {
        Optional optional = sangeetRepository.findById(track.getTrackId());
        if((optional.isPresent())){
            throw new TrackAlreadyExistException();
        }
        return sangeetRepository.insert(track);
    }

    //delete tracks from list//
    @Override
    public boolean deleteTrackFromWishList(String id) throws TrackNotFoundException {
        boolean status = false;
        Optional optional = sangeetRepository.findById(id);
        if(optional.isPresent()){
            sangeetRepository.deleteById(id);
            status=true;
        }
        else{
            throw new TrackNotFoundException();
        }
        return status;
    }

    //update comments//
    @Override
    public Track updateCommentForTrack(String comments, String id) throws TrackNotFoundException {
        Optional optional=sangeetRepository.findById(id);
        if(optional.isPresent()){
            track=sangeetRepository.findById(id).get();
            track.setComments(comments);
            sangeetRepository.save(track);
        }
        else
        {
            throw new TrackNotFoundException();
        }
        return track;
    }

    //get all tracks//
    @Override
    public List<Track> getAllTrackFromWishList() throws Exception {
        return sangeetRepository.findAll();
    }
}
