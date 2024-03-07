/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateEvent } from '../redux/EventReducer/action';

export const Eventcreator = ({ onOpens, LetClose }) => {
    const token = useSelector((store) => store.AuthReducer.token)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        venue: '',
        description: '',
        date: '',
        image: ''
    });
    const [image, setImage] = useState(null);
    const handleChange = (e) => {
        const { type, name, value } = e.target;
        if (type == "file") {
            setImage(e.target.files[0])
        } else {
            setFormData({...formData,[name]: value});
        }
    };

    const handleSignup = (e) => {
        e.preventDefault()
        const formValue = new FormData();
        formValue.append('name', formData.name)
        formValue.append('venue', formData.venue)
        formValue.append('description', formData.description)
        formValue.append('date', formData.date)
        formValue.append('image', image)
        dispatch(CreateEvent(formValue,token))
        LetClose();
    };

    return (
        <Modal isOpen={onOpens} onClose={LetClose} size="sm" isCentered >
            <ModalOverlay />
            <ModalContent fontFamily={"poppins"} borderRadius={"15px"}>

                <ModalHeader border="none" fontWeight={"bold"} color="#2b3954"
                    fontSize="25" className='text-center'>Create Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        className='justify-center items-center'
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        marginBottom={4}
                        fontSize={"16px"}
                    />
                    <Input
                        name="venue"
                        placeholder="Venue"
                        value={formData.venue}
                        onChange={handleChange}
                        marginBottom={4}
                        fontSize={"16px"} className='justify-center  items-center'
                    />
                    <Input
                        name="description"
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        marginBottom={4}
                        fontSize={"16px"} className='justify-center items-center'
                    />
                    <Input
                        name="image"
                        type="file"
                        onChange={handleChange}
                        marginBottom={4}
                        fontSize={"16px"} className='justify-center  items-center'
                    />
                    <Input
                        name="date"
                        type="date"
                        placeholder="Date"
                        value={formData.date}
                        onChange={handleChange}
                        marginBottom={4}
                        fontSize={"16px"} className='justify-center  items-center'
                    />

                </ModalBody>

                <ModalFooter>

                    <Button
                        colorScheme="white" fontSize="16" w="100%" fontWeight="400" bg="#2b3954" _hover={{ bgColor: "#e89f22" }} letterSpacing={"1px"} onClick={handleSignup}>
                        CREATE EVENT
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};